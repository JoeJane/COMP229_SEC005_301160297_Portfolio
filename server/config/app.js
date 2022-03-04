// install 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// module for Authentication
let session = require('express-session');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let flash = require('connect-flash');

// Mongo Database configuration
let mongoose = require('mongoose');
let DB = require('./db');

// point mongoose to the DB URI
mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

// Import Routers
let indexRouter = require('../routes/index');
let businessContactRouter = require('../routes/businessContact');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// This is the basic express session({..}) initialization
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

// init passport on every route call.
app.use(passport.initialize());

// allow passport to use "express-session".
app.use(passport.session());

// create a User model instance
let userModel = require('../models/user');
let User = userModel.User;
let UserControl = require('../controllers/user')

// Implement a User Authentication Strategy
authUser = (username, password, done) => {
  UserControl.getUserByUsername(username, function(err, user){
    if(err)
      throw err;

    if(!user){
      console.log('Unknown User');
      return done(null, false, {message: 'Unknown User'});
    }

    let isMatch = password == user.password;

    if(isMatch){
      return done(null, user);
    } else {
      console.log('Invalid Password');
      return done(null, false, {message: 'Invalid Password'});
    }
  });
}

passport.use(new LocalStrategy(authUser));


// serialize and deserialize the user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routers entry point
app.use('/', indexRouter);
app.use('/businessContact', businessContactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if(err.status == 404){
    res.locals.message = 'Page Not Found'
  } else if(err.status == 500){
    res.locals.message = 'Server Error'
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error'});
});

module.exports = app;
