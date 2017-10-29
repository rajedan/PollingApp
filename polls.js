//This file is created to use for showing the result of a poll,
//create a new poll and show the page to give option to participate in existing poll
var express = require('express');
var router = express.Router();

router.get('/createpoll', function(req,res){
 res.send('Hello, this is page to create a new poll');
});

router.get('/participate', function(req,res){
 res.send('Hello, this is the page to participate in poll');
});


router.get('/pollresult', function(req,res){
 res.send('Hello, this is poll result page showing single poll result');
});

//This is to export this module to use in index.js
module.exports = router;
