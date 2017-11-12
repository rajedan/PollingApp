//This file is created to use for user management related js like login and signup js codes
var express = require('express');
var router = express.Router();
var mongo = require('mongodb')
var MongoClient = mongo.MongoClient;
var passport = require('passport');//
var flash    = require('connect-flash');

var session      = require('express-session');
var LocalStrategy = require('passport-local').Strategy;//

var db;//
var url = "mongodb://localhost:27017/pollingapp";
var app = express();

//app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
//app.use(passport.initialize());
//app.use(passport.session());
router.use(flash());

MongoClient.connect(url, function(err, dbConnection) {
  if (err) {
    console.log("db error in user!");
    res.render('error');
  } else {
    console.log("conncted from user!");
    db = dbConnection;
  }
})
//passport stuffs
passport.serializeUser(function(user, done) {
  done(null, user.emailid);
});
passport.deserializeUser(function(useremailid, done) {
  db.collection("users").findOne({emailid:useremailid},function(err,userDetail){
       //console.log(res.name+"-"+res.emailid+"-"+res.password);
       done(err, userDetail);
     });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.collection("users").findOne({emailid:username, password:password},function(userErr,userDomain){
         if(userErr) { return done(userErr); }
         if (!userDomain) {
           console.log('User not found');
           return done(null, false, { errors: [{ msg: ['Incorrect Username/Password'] }] });
         }
         console.log('User found');
         done(null, userDomain);
       });
  }
));
//passport stuffs - end

router.get('/login', function(req, res) {
  console.log("::"+req.user);
  if(req.user){return res.redirect('/');}
  res.render('login');
});

router.get('/signup', function(req, res) {
  res.render('register');
});

router.post('/signup', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  req.checkBody('name', 'Name cannot be blank').notEmpty();
  req.checkBody('email', 'Please enter valid email id').isEmail();
  req.checkBody('password', 'Password must have min 6 and max 18 characters').isLength({
    min: 6,
    max: 18
  });
  req.checkBody('password', 'Password and Confirm Password do not match').equals(confirmPassword);
  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {

    //validate the email id whether email id is already taken or not, if not then register user
    db.collection('users').count({
      emailid: email.toLowerCase()
    }, function(userError, userResult) {
      if (!errors && userResult > 0) {
        res.render('register', {
          errors: [{
            msg: ['User already exist with this Email']
          }]
        });
      } else {
        var obj = {
          name: name,
          emailid: email,
          password: password
        };
        db.collection("users").insertOne(obj, function(insertErr, insertResult) {
          if (insertErr) {
            res.render('register', {
              errors: [{
                msg: ['Something went wrong']
              }]
            });
          }
          console.log("Total inserted objects :" + insertResult.insertedCount);
          if (insertResult.insertedCount == 1) {
            req.flash('success_msg', 'You have successfully registered! Please login now.');
            res.redirect('/user/login');
            // res.render('login', {
            //   msg: "You have successfully registered! Please login now.",
            //   success: true
            // });
          } else {
            res.render('register', {
              errors: [{
                msg: ['Something went wrong']
              }]
            });
          }
        });
      }
    });
  }
});

 // router.post('/login',passport.authenticate('local'),function(req,res){
 //   res.redirect('/');
 // });
router.post('/login', function(req, res, next) {
   passport.authenticate('local', function(err, user, info) {
     if (err) { return next(err); }
     if (!user) { return res.render('login',{ errors: [{ msg: ['Username/Password is wrong'] }] }); }
     req.logIn(user, function(err) {
       if (err) { return next(err); }
       return res.redirect('/');
     });
   })(req, res, next);
});

router.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

router.get('/mypolls', function(req, res) {
  if(!req.user) {return res.redirect('/user/login')};
  var mysort = {_id:-1};
  db.collection("polls").find({createdby:req.user.emailid}).sort(mysort).toArray(function(err, result){
    if (err) {
      throw err;
    }
    res.render('mypolls',{
      polls : result,
      helpers: { json: function (context) { return JSON.stringify(context); }}
    });
  });
});

router.get('/delete/:id([a-z0-9]{24})', function(req, res) {
  if(!req.user){return res.redirect('/user/login')};
  var deletedCount = 0;
  var del = {_id: new mongo.ObjectId(req.params.id)};
  db.collection("polls").deleteOne(del, function(errr,obj){
   if(errr) throw errr;
   deletedCount = obj.deletedCount;
   var mysort = {_id:-1};
   db.collection("polls").find({createdby:req.user.emailid}).sort(mysort).toArray(function(err, result){
     if (err) {
       throw err;
     }
     res.render('mypolls',{
       polls : result,
       helpers: { json: function (context) { return JSON.stringify(context); }}
     });
   });
  });
});
//This is to export this module to use in index.js
module.exports = router;
