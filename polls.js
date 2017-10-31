//This file is created to use for showing the result of a poll,
//create a new poll and show the page to give option to participate in existing poll
var express = require('express');
var router = express.Router();
var mongo = require('mongodb')
var MongoClient = mongo.MongoClient;
var db;
var hasError = false;

var url = "mongodb://localhost:27017/pollingapp";
MongoClient.connect(url, function(err, dbConnection){
  if(err) {
    console.log("db error in polls!");
    res.render('error',{
      message: "DB Connection Issue!",
      error:{
        status: 303,
        stack: err
      }
    });
  } else {
    console.log("conncted from polls!");
    db = dbConnection;
  }
})

router.get('/createpoll', function(req,res){
  res.render('newpoll');
});

router.get('/participate', function(req,res){
 res.send('Hello, this is the page to participate in poll');
});


router.get('/pollresult', function(req,res){
 res.send('Hello, this is poll result page showing single poll result');
});

router.get('/:id([a-z0-9]{24})', function(req, res){
  var del = {_id: new mongo.ObjectId(req.params.id)};
  db.collection("polls").findOne(del,function(errr, result){
    if(errr) throw errr;//handle the situation here when no poll will be found
    res.render('poll',result);
  });
})

//This is to export this module to use in index.js
module.exports = router;
