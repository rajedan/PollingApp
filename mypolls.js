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

router.get('/', function(req,res){

});

app.delete('/mypolls:_id', function (req, res) {
  res.send('Got a DELETE request at /user')
  db.collection('Todo').deleteOne({ "_id" : ObjectId("563237a41a4d68582c2509da") }).then((result)=>{
    console.log(result);
  })
})
