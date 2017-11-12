//This file is created to use for user management related js like login and signup js codes
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


router.get('/login', function(req,res){
 res.send('Hello, this is login page');
});

router.get('/signup', function(req,res){
 res.send('Hello, this is signup page');
});

router.get('/mypolls', function(req,res){



  var error;
  var polls;
  var mysort = {_id:-1};
  db.collection("polls").find().sort(mysort).toArray(function(err, dbres){
    if(err){
      hasError = true;
      error = "Error connecting to the DB/ loading data from DB";
    } else {
      hasError = false;
    }
    if (dbres.length == 0) {
      hasError = true;
      error = "No Polls Found, Please login to create one!";
    }
    res.render('mypolls', {
      hasError: hasError,
      message : error,
      polls : dbres
    })
    //console.log("In"+polls);
  });

});
//This is to export this module to use in index.js
module.exports = router;
