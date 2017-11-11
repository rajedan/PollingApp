//This file is created to use for user management related js like login and signup js codes
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var passport = require('passport');//
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var LocalStrategy = require('passport-local').Strategy;//

var db;//
var url = "mongodb://localhost:27017/pollingapp";
var app = express();



app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

MongoClient.connect(url, function(err, dbConnection) {
  if (err) {
    console.log("db error in user!");
    res.render('error');
  } else {
    console.log("conncted from user!");
    db = dbConnection;
  }
})

router.get('/login', function(req, res) {
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
  console.log(name + '-' + email + '-' + password + '-' + confirmPassword);
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
    console.log('yes');
  } else {

    //validate the email id whether email id is already taken or not, if not then register user
    db.collection('users').count({
      emailid: email.toLowerCase()
    }, function(userError, userResult) {
      console.log("countt is:" + userResult);
      if (!errors && userResult > 0) {
        console.log('throwing error');

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
            res.render('login', {
              msg: "You have successfully registered! Please login now.",
              success: true
            });
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
    console.log('errors are:' + errors);
  }
});

// router.post('/login', function(req, res) {
//       var email = req.body.email;
//       var password = req.body.password;
//       req.checkBody('email', 'Please enter valid email id').isEmail();
//       req.checkBody('password', 'Please enter valid Password').notEmpty();
//       var errors = req.validationErrors();
//       console.log(email + '-' + password);
//       if (errors) {
//         res.render('login', {
//           errors: errors
//         });
//         console.log('yes');
//       } else {
//             res.redirect('/'); //this redirect to dashboard
//             console.log('no');
//           }
//       });
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {
    succesRedirect: '/',
    failureRedirect: '/user/login'
  }));

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username+'-'+password);
    db.collection('users').count({emailid:username.toLowerCase(), password:password}, function(userErr, userRes){
      if(userErr) throw userErr;
      if (userRes ==0 ) {
        console.log('no user found');
        return done(null, false, {message: "Username/Password is wrong"});
      } else {
        console.log('found');
        return done(null, true);
      }
    });

  }
));
//This is to export this module to use in index.js
module.exports = router;
