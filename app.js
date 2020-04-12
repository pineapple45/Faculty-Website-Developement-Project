const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();

const server = require('http').Server(app);
global.io = require('socket.io')(server);

require('./sockets/interestItemsSocket');

//This is for link static files in public folder
app.use(express.static(__dirname + '/public'));

//Passport Config
require('./config/passport')(passport);

// DB Config

const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{console.log("Mongo DB connected...")}).catch((err)=>(console.log(err)));
global.conn = mongoose.createConnection(db, {useNewUrlParser: true, useUnifiedTopology: true},() => {console.log('MongoDB connected...')});
mongoose.set('useCreateIndex', true);

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body Parser
app.use(express.urlencoded({extended: false}));


//Express-session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());


//Global vars
app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


//Routes
app.use('/',require('./routes/index'));
app.use('/dashboard/researchInterest',require('./routes/researchInterest'));
app.use('/dashboard/facilities',require('./routes/facilities'));
app.use('/dashboard/vacancy',require('./routes/vacancy'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 5000;

server.listen(PORT,console.log(`server started on ${PORT}`));
