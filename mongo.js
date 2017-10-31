var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/pollingapp";
var express = require('express');
var router = express.Router();
var mongo = require('mongodb')

// MongoClient.connect(url, function(err,db){
//   if(err) {
//     console.log(err);
//     throw err;
//   } else {
//     console.log("connected to the db!");
//     var obj = {
//       emailid: "rajedan@gmail.com",
//       name: "rajesh",
//       password: "admin"
//     };
//     db.collection("users").insertOne(obj,function(err,res){
//       if(err) throw err;
//       console.log("Total inserted objects :"+res.insertedCount +"->"+res.ops+"->"+res.insertedId);
//       db.close();
//     });
//   }
//   db.close();
// });

// MongoClient.connect(url, function(err,db){
//   if(err) throw err;
//   console.log("connected successfuly");
//   db.collection("users").findOne({},function(err,res){
//     console.log(res.name+"-"+res.emailid+"-"+res.password);
//   });
//   db.close();
// })

// MongoClient.connect(url,function(err,db){
//   if(err) throw err;
//   console.log("connected!");
//   db.collection("users").find({}).toArray(function(err,res){
//     if(err) throw err;
//     console.log(res);
//     db.close();
//   });
// });

// MongoClient.connect(url,function(err,db){
//   if(err) throw err;
//   console.log("connected!");
//   db.collection("users").find({},{_id: true, name: true, emailid: true, mnumber: true}).toArray(function(errr,res){
//     if(err) throw errr;
//     console.log(res);
//     db.close();
//   });
// });

//This can be used for searching for a poll with any keyword of question(case insensitive)
// MongoClient.connect(url,function(err,db){
//   if(err) throw err;
//   console.log("connected");
//   var query = { question: /.*QueStio.*/i };
//   db.collection("polls").find(query).toArray(function(err,res){
//     if(err) throw err;
//     console.log(res);
//     db.close();
//   });
// });

//This can be used to list all polls and show with created time and sort based on created time
// MongoClient.connect(url,function(err,db){
//   if(err) throw err;
//   console.log("connected!");
//   var mysort = {_id:-1};
//   db.collection("polls").find().sort(mysort).toArray(function(errr,res){
//     if(errr) throw errr;
//     //console.log(res);
//     res.forEach(function(rec){
//       //console.log(rec._id.getTimestamp());
//       d=rec._id.getTimestamp();
//       console.log(d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
//     })
//     db.close();
//   });
// });

//This can be used to delete the poll based on its id
// MongoClient.connect(url,function(err,db){
//   if(err) throw err;
//   console.log("connected!");
//   var del = {_id: new mongo.ObjectId("59f781d8d97613e6c64eb05d")};
//   db.collection("polls").deleteOne(del, function(errr,obj){
//     if(errr) throw errr;
//     console.log(obj.deletedCount);
//     db.close();
//   });
// });

//This can be used for updating any poll question or options or count based on Id. Make sure to pass all the elements in json to update as new object  
// MongoClient.connect(url,function(err,db){
//   if(err) throw err;
//   console.log("connected!");
//   var query = { _id: new mongo.ObjectId("59f781d8d97613e6c64eb05d")};
//   var newObj = {"createdby" : "user@example.com",
//     "question" : "question 2 In Detail edit",
//     "options" : [
//         {
//             "option" : "This is option 1",
//             "count" : 0.0
//         },
//         {
//             "option" : "This is option 2",
//             "count" : 0.0
//         },
//         {
//             "option" : "This is option 3",
//             "count" : 0.0
//         }
//     ]};
//     db.collection("polls").updateOne(query, newObj, function(errr,res){
//       if(errr) throw errr;
//       console.log(res.modifiedCount);
//     });
// })

module.exports = router;
