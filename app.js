require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const mongoStore = require('connect-mongo')(session);
const app = express();

app.use(cors());

const {
  ensureAuthenticated
} = require('./config/auth');

// make a global sockei.io connection
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
mongoose.connect(db, {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{console.log("MongoDB connected...")}).catch((err)=>(console.log(err)));
global.conn = mongoose.createConnection(db, {useNewUrlParser: true, useUnifiedTopology: true},() => {console.log('MongoDB connected...')});
mongoose.set('useCreateIndex', true);

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body Parser
app.use(express.urlencoded({extended: false}));

//Express-session
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {secure:true},
  store: new mongoStore({ mongooseConnection: global.conn,
                          collection: 'sessions',
                          ttl:  60 *  60 })
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
app.use('/', require('./routes/index'));
app.use('/dashboard',ensureAuthenticated, require('./routes/dashboard'));
app.use('/dashboard/gallery',ensureAuthenticated, require('./routes/gallery'));
app.use('/dashboard/researchInterest',ensureAuthenticated, require('./routes/researchInterest'));
app.use('/dashboard/facilities',ensureAuthenticated, require('./routes/facilities'));
app.use('/dashboard/vacancy',ensureAuthenticated, require('./routes/vacancy'));
app.use('/dashboard/contacts',ensureAuthenticated, require('./routes/contacts'));
app.use('/dashboard/journals',ensureAuthenticated, require('./routes/journals'));
app.use('/dashboard/book-and-book-chapters',ensureAuthenticated, require('./routes/book-and-book-chapters'));
app.use('/dashboard/group-activities',ensureAuthenticated, require('./routes/group-activities'));
app.use('/dashboard/awards-and-academics',ensureAuthenticated, require('./routes/awards-and-academics'));
app.use('/dashboard/invited-talks',ensureAuthenticated, require('./routes/invited-talks'));
app.use('/dashboard/lab-news',ensureAuthenticated, require('./routes/lab-news'));
app.use('/dashboard/latest-research',ensureAuthenticated, require('./routes/latest-research'));
app.use('/dashboard/cm-research-scholars',ensureAuthenticated, require('./routes/cm-research-scholars'));
app.use('/dashboard/cm-internship-students',ensureAuthenticated, require('./routes/cm-internship-students'));
app.use('/dashboard/cm-project-fellow',ensureAuthenticated, require('./routes/cm-project-fellow'));
app.use('/dashboard/cm-visiting-faculty',ensureAuthenticated, require('./routes/cm-visiting-faculty'));
app.use('/dashboard/cm-masters-students',ensureAuthenticated, require('./routes/cm-masters-students'));
app.use('/dashboard/cm-bachelor-students',ensureAuthenticated, require('./routes/cm-bachelor-students'));
app.use('/dashboard/cm-all',ensureAuthenticated, require('./routes/cm-all'));

app.use('/dashboard/allumni-research-scholars',ensureAuthenticated, require('./routes/allumni-research-scholars'));
app.use('/dashboard/allumni-internship-students',ensureAuthenticated, require('./routes/allumni-internship-students'));
app.use('/dashboard/allumni-project-fellow',ensureAuthenticated, require('./routes/allumni-project-fellow'));
app.use('/dashboard/allumni-visiting-faculty',ensureAuthenticated, require('./routes/allumni-visiting-faculty'));
app.use('/dashboard/allumni-masters-students',ensureAuthenticated, require('./routes/allumni-masters-students'));
app.use('/dashboard/allumni-bachelor-students',ensureAuthenticated, require('./routes/allumni-bachelor-students'));
app.use('/dashboard/allumni-all',ensureAuthenticated, require('./routes/allumni-all'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 5000;

server.listen(PORT,console.log(`server started on ${PORT}`));
