const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const {GridFSBucket} = require('mongo');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require("path");
const bcrypt = require('bcryptjs');

const {
  ensureAuthenticated
} = require('../config/auth');



// DB Config
const db = require('../config/keys').MongoURI;
mongoose.set('useFindAndModify', false);


//vacancyItem model
const model = require('../models/InterestItem');
const VacancyItem = model.vacancyItem;

// router.get('/', (req, res) => res.send('vacancy page'));

// let editItemId;

// router.get("/", function(req, res) {
//
//   InterestItem.find(function(err, foundItems) {
//     if (err) {
//       console.log(err);
//     } else {
//       if (foundItems.length === 0) {
//
//         res.render("researchInterest", {
//           newInterestItems: false,
//         });
//         // res.redirect("back");
//       } else {
//         res.render("researchInterest", {
//           newInterestItems: foundItems,
//         });
//       }
//     }
//   }).sort({
//     pos: 1
//   }).exec(function(err, docs) {
//     if(err)
//     {
//       console.log(err);
//     }
//
//   });
//
// });

require("./get/generic")({router:router,Item:VacancyItem,renderedPage:'vacancy'});



// router.post("/", function(req, res) {
//   const interestItemSubject = req.body.newInterestItemSubject;
//   const interestItemDetails = req.body.newInterestItemDetails;
//
//   InterestItem.countDocuments({}).then(val =>{
//         const interestItem = new InterestItem({
//           subject: interestItemSubject,
//           details: interestItemDetails,
//           pos: val
//         });
//
//         interestItem.save();
//         res.redirect("/dashboard/researchInterest");
//   }).catch(err =>{
//       if(err){
//         console.error(err);
//         console.log(err);      }
//   })
// });
require("./post/generic")({router:router,Item:VacancyItem});


// var deleteItemId = "";
//
// io.on('connection', function(socket) {
//   socket.on('deleteInterestItem', (data) => {
//       deleteItemId = data;
//   });
// });
//
//
// router.post("/delete", function(req, res) {
//
//   InterestItem.findByIdAndRemove(deleteItemId).then(() =>{
//     console.log(deleteItemId);
//     console.log('Item deleted successfully');
//     deleteItemId = "";
//     res.redirect("/dashboard/researchInterest");
//   }).catch(err =>{
//     if (err) {
//       console.error(err);
//       console.log(err);
//     }
//   });
//
//
// });

require("./post/delete")({router:router,Item:VacancyItem});



// io.on('connection', function(socket) {
//   socket.on('editInterestItem', (data) => {
//     editItemId = data;
//
//       InterestItem.find({_id:data}).then((foundItems) =>{
//         socket.emit('editInterestItem',{
//           subject: foundItems[0].subject,
//           details: foundItems[0].details
//         });
//       }).catch((err) =>{
//         if(err)
//         {
//           console.error(err);
//           console.log(err);
//         }
//       })
//
//
//   });
// });
//
//
//
//
// router.post("/edit", function(req, res) {
//   const interestItemSubject = req.body.newInterestItemSubject;
//   const interestItemDetails = req.body.newInterestItemDetails;
//
//
//    InterestItem.findByIdAndUpdate({_id:editItemId},{subject:interestItemSubject,details:interestItemDetails}).then((foundItems) => {
//       console.log('Variables updated successfully!!');
//       res.redirect('/dashboard/researchInterest');
//     }).catch((err) =>{
//       if(err){
//         console.error(err);
//         console.log(err);
//       }
//     });
//
// });

require("./post/edit")({router:router,Item:VacancyItem});


module.exports = router;
