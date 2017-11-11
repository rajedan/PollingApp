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
        status: false
      });
      //throw error;
    }
    var isInserted = result.insertedCount == 1;
    //var status = isInserted ? 201 : 500;//201 if inserted else 500
    var msg =  isInserted ? "Poll has been successfully created!" : "Failed to create poll, please try again!";
    res.render('error', {
      message: msg,
      status: isInserted
    });
    // res.send(msg);
  })
  //res.send('The poll has been created!');
});

router.get('/pollresult/:id([a-z0-9]{24})', function(req, res) {
  //res.send('Hello, this is poll result page showing single poll result');
  console.log("in result");
  //res.send("in result page");
  var query = {
    _id: new mongo.ObjectId(req.params.id)
  };
  db.collection("polls").findOne(query, function(errr, result) {
    if (errr) {
      throw errr; //handle the situation here when no poll will be found
      res.render('error', {
        message: "Something went wrong, please check with poll-creater whether the poll exist!",
        status: false
      });
    }
    //result = JSON.parse(result);
     res.render('result', {
       result: result,
       helpers: { json: function (context) { return JSON.stringify(context); }}
     });
  });
});

router.get('/:id([a-z0-9]{24})', function(req, res) {
  var query = {
    _id: new mongo.ObjectId(req.params.id)
  };
  db.collection("polls").findOne(query, function(errr, result) {
    if (errr) throw errr; //handle the situation here when no poll will be found
    res.render('poll', result);
  });
})

//this is function for update of the counts after voting
router.post('/vote', function(req, res){
  console.log(req.body);
  var query = {
    _id: new mongo.ObjectId(req.body.id)
  };
  db.collection("polls").findOne(query, function(errr, result) {
    if (errr) throw errr; //handle the situation here when no poll will be found/deleted
    result.options.forEach(function(value){
      console.log(value);
      if(value.option==req.body.option){
        //console.log("got the value : "+value.option+req.body.option);
        value.count = value.count+1;
      }
    });
    console.log(result);
    db.collection("polls").updateOne(query, result, function(errr,updateRes){
           if(errr) throw errr;
           console.log(updateRes.modifiedCount);
           if (errr) {
             res.render('error', {
               message: "Fatal error! Your vote was not logged.",
               status: false
             });
           }
           var isInserted = updateRes.modifiedCount == 1;
           var msg =  isInserted ? "Your precious vote has been successfully logged!" : "Failed to log your vote!";
           res.render('error', {
             message: msg,
             status: isInserted
           });
         });
  });
  //res.send('after vote');
});
//This is to export this module to use in index.js
module.exports = router;
