//This file is created to use for user management related js like login and signup js codes
var express = require('express');
var router = express.Router();

router.get('/login', function(req,res){
 res.send('Hello, this is login page');
});

router.get('/signup', function(req,res){
 res.send('Hello, this is signup page');
});

//This is to export this module to use in index.js
module.exports = router;
