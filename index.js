//This is the main entry js file. The all request comes here and route to the other js files
var express = require('express');
var app = express();

var user = require('./user.js');
var dashboard = require('./dashboard.js');
var userpolls = require('./userpolls.js');
var polls = require('./polls.js');

app.use('/user', user);
app.use('/',dashboard);//Default or welcome page lands to Dashboard page
app.use('/userpolls',dashboard);
app.use('/polls',dashboard);


//this below code is to handle any error
app.use('*',function(req,res){
  res.send('404-Page Not Found');
})

app.listen(3000);
