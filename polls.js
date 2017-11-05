//This file is created to use for showing the result of a poll,
//create a new poll and show the page to give option to participate in existing poll
var express = require('express');
var router = express.Router();
var mongo = require('mongodb')
var MongoClient = mongo.MongoClient;
var db;
var hasError = false;

var url = "mongodb://localhost:27017/pollingapp";
MongoClient.connect(url, function(err, dbConnection) {
  if (err) {
    console.log("db error in polls!");
    res.render('error', {
      message: "DB Connection Issue!",
      error: {
        status: 303,
        stack: err
      }
    });
  } else {
    console.log("conncted from polls!");
    db = dbConnection;
  }
})

router.get('/createpoll', function(req, res) {
  res.render('newpoll');
});

router.post('/create', function(req, res) {
  var allData = JSON.parse(JSON.stringify(req.body));
  console.log("in create:" + allData);
  var jsonData = {};
  //var jsonArray = [];
  jsonData['question'] = allData['question'];
  jsonData['createdby'] = 'test-user';
  jsonData['options'] = [];
  for (var key in allData) {
    // if (key == 'question') {
    // jsonData[key] = allData[key];
    // } else {
    if (key.includes('option')) {
      var optionCount = {};
      optionCount['option'] = allData[key];
      optionCount['count'] = 0;
      jsonData['options'].push(optionCount);
    }
  }
  jsonData = JSON.stringify(jsonData);
  console.log(jsonData);
  db.collection("polls").insertOne(JSON.parse(jsonData), function(error, result) {
    if (error) {
      res.render('error', {
        message: "Fatal error!",
        status: 404,
        stack: error
      });
      //throw error;
    }
    var msg = result.insertedCount == 1 ? "Poll has been successfully created!" : "Failed to create poll, please try again!";
    res.render('error', {
      message: msg,
      status: 201
    });
    // res.send(msg);
  })
  //res.send('The poll has been created!');
});

router.get('/participate', function(req, res) {
  res.send('Hello, this is the page to participate in poll');
});


router.get('/pollresult', function(req, res) {
  res.send('Hello, this is poll result page showing single poll result');
});

router.get('/:id([a-z0-9]{24})', function(req, res) {
  var del = {
    _id: new mongo.ObjectId(req.params.id)
  };
  db.collection("polls").findOne(del, function(errr, result) {
    if (errr) throw errr; //handle the situation here when no poll will be found
    res.render('poll', result);
  });
})

//This is to export this module to use in index.js
module.exports = router;
