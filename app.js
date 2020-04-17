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
app.use('/dashboard',require('./routes/dashboard'));
app.use('/dashboard/gallery',require('./routes/gallery'));
app.use('/dashboard/researchInterest',require('./routes/researchInterest'));
app.use('/dashboard/facilities',require('./routes/facilities'));
app.use('/dashboard/vacancy',require('./routes/vacancy'));
app.use('/dashboard/journals',require('./routes/journals'));
app.use('/dashboard/book-and-book-chapters',require('./routes/book-and-book-chapters'));
app.use('/dashboard/group-activities',require('./routes/group-activities'));
app.use('/dashboard/awards-and-academics',require('./routes/awards-and-academics'));
app.use('/dashboard/invited-talks',require('./routes/invited-talks'));
app.use('/dashboard/lab-news',require('./routes/lab-news'));
app.use('/dashboard/latest-research',require('./routes/latest-research'));
app.use('/dashboard/cm-research-scholars',require('./routes/cm-research-scholars'));
app.use('/dashboard/cm-internship-students',require('./routes/cm-internship-students'));
app.use('/dashboard/cm-project-fellow',require('./routes/cm-project-fellow'));
app.use('/dashboard/cm-visiting-faculty',require('./routes/cm-visiting-faculty'));
app.use('/dashboard/cm-masters-students',require('./routes/cm-masters-students'));
app.use('/dashboard/cm-bachelor-students',require('./routes/cm-bachelor-students'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 5000;

server.listen(PORT,console.log(`server started on ${PORT}`));
