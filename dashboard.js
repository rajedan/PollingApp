//This file is created to use for dashboard related js codes
var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
 res.send('Hello, this is dashboard page');
});


//This is to export this module to use in index.js
module.exports = router;
