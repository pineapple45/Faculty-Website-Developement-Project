require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const async = require('async');


//User model
const User = require('../models/User');
//Login page
router.get('/login',(req,res) => res.render('login'));

//Register page
router.get('/register',(req,res) => res.render('register'));

//Register handle
router.post('/register',(req,res) =>{
  const {name, email, password, password2} = req.body;

  let errors = [];

  //check required feilds
  if(!name || !email || !password || !password2)
  {
    errors.push({msg: "Please fill in all feilds"});
  }

  //check password match
  if(password !== password2)
  {
    errors.push({msg: "Passwords do not match"});
  }

  //check password length

  if(password.length < 6)
  {
    errors.push({msg: "Password should have at least 6 characters"});
  }

   // check password special characters
  const regex = /^[A-Za-z0-9 ]+$/
  let isValid = regex.test(password);
  if(isValid)
  {
    errors.push({msg: "Password should contain special characters( '@','#','$','_' etc)"});
  }

  if(errors.length >0)
  {
    res.render('register',{
      errors,
      name,
      email,
      password,
      password2
    });
  }
  else{
    //Validation passed
    User.findOne({email: email})
    .then(user => {
      if(user){
        // Email already registered
        errors.push({msg: "Email is already registered"});
        res.render('register',{
          errors,
          name,
          email,
          password,
          password2
        });
      }
      else{
        //create new user
        const newUser = new User({
          name,
          email,
          password
        });

        // Hash password

        bcrypt.genSalt(10,(err, salt) => {
          if(err){
            console.log(err);
          }
          bcrypt.hash(newUser.password, salt,(err,hash) => {
            if(err) throw err;
            //set password to hashed
            newUser.password = hash;

            //save user
            newUser.save()
            .then(user => {
              req.flash('success_msg','You are now registered and can log in');
              res.redirect('/users//login');
            })
            .catch(err => {
              console.log(err);
            });
          });
        });

      }
    });

  }

});


// login handle
router.post('/login' ,(req,res,next) => {
   passport.authenticate('local', {
     successRedirect: '/dashboard',
     failureRedirect: '/users/login',
     failureFlash: true
   })(req,res,next);
});


//Logout handle

router.get('/logout',(req,res) => {
req.logout();
req.flash('success_msg','Successfully logged out');
res.redirect('/users/login');
});

module.exports = router;


//Forgot Password handle
router.get('/forgot', function(req, res) {
  res.render('forgot');
});

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/users/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'gomraanmol@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'gomraanmol@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/users/forgot');
  });
});

//Reset Password Handle

router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/users/forgot');
    }
    res.render('reset', {token: req.params.token});
  });
});

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {

          // Hash password

          bcrypt.genSalt(10,(err, salt) => {
            if(err){
              console.log(err);
            }
            bcrypt.hash(req.body.password, salt,(err,hash) => {
              if(err) throw err;
              //set password to hashed
              user.password = hash;

              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;

              //save user
              user.save()
              .then(user => {
                req.flash('success_msg','You are now registered with new password and can log in');
                res.redirect('/users/login');
              })
              .catch(err => {
                console.log(err);
              });
            });
          });

        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'gomraanmol@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'gomraanmol@mail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/dashboard/researchInterest');
  });
});
