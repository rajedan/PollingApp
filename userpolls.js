//This file is created to use for showing all polls to user where user can edit, delete his/her polls
var express = require('express');
var router = express.Router();

router.get('/showall', function(req,res){
 res.send('Hello, this is page to show all polls of a logged in user');
});

//This is to export this module to use in index.js
module.exports = router;
