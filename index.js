//This is the main entry js file. The all request comes here and route to the other js files
var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var user = require('./user.js');
var dashboard = require('./dashboard.js');
var userpolls = require('./userpolls.js');
var polls = require('./polls.js');
var app = express();
//view engine setup
app.engine('.hbs',exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/user', user);
app.use('/',dashboard);//Default or welcome page lands to Dashboard page
app.use('/userpolls',userpolls);
app.use('/polls',polls);


//this below code is to handle any error
app.use('*',function(req,res){
  res.render('pagenotfound');
})

app.listen(3000);
