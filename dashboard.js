//This file is created to use for dashboard related js codes
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db;
var hasError = false;

var url = "mongodb://localhost:27017/pollingapp";
MongoClient.connect(url, function(err, dbConnection){
  if(err) {
    console.log("db error in dashboard!");
    res.render('error');
  } else {
    console.log("conncted from dashboard!");
    db = dbConnection;
  }
})

router.get('/', function(req,response){
 //res.send('Hello, this is dashboard page');
 var error;
 var polls;
 var mysort = {_id:-1};
 db.collection("polls").find().sort(mysort).toArray(function(err, res){
   if(err){
     hasError = true;
     error = "Error connecting to the DB/ loading data from DB";
   } else {
     hasError = false;
   }
   if (res.length == 0) {
     hasError = true;
     error = "No Polls Found, Please login to create one!";
   }
   response.render('index', {
     hasError: hasError,
     message : error,
     polls : res
   })
   //console.log("In"+polls);
 });
 //console.log("Out"+polls);

});


//This is to export this module to use in index.js
module.exports = router;
