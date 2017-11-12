//This is the main entry js file. The all request comes here and route to the other js files
var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var hbbs = require('handlebars');
var bodyParser = require('body-parser');
var user = require('./user.js');
var dashboard = require('./dashboard.js');
var userpolls = require('./userpolls.js');
var polls = require('./polls.js');
var expressValidator = require('express-validator');//the validator
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');//
var session      = require('express-session');//
var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());//the validator
app.use(express.static(path.join(__dirname,'public')));
//passport stuffs
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
// use connect-flash for flash messages stored in session
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//view engine setup
app.engine('.hbs',exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');
//for user name setting
app.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.user = req.user || null;
  next();
});
app.use('/user', user);
app.use('/',dashboard);//Default or welcome page lands to Dashboard page
app.use('/userpolls',userpolls);
app.use('/polls',polls);


//this below code is to handle any error
app.use('*',function(req,res){
  res.render('pagenotfound');
})
hbbs.registerHelper("inc", function(value, options) {
    return parseInt(value) + 1;
});
app.listen(3000);
