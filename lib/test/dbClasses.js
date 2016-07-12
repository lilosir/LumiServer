"use strict";

require("babel-polyfill");
var co = require("co");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lumi');

var db = mongoose.connection;
db.on('error', function (err) {
  console.log(err);
});

db.on('disconnected', function () {
  console.log('Datebase disconnected!!');
});

var Users = require('../models/users');
var Sessions = require('../models/sessions');
var Classes = require('../models/classes');

// clear
// Classes.remove({},function(err, docs){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(docs);
//   }
// });

Classes.find({}, function (err, docs) {
  if (err) {
    console.log(err);
  } else {
    console.log(docs[0]);
  }
});

// co(function* (){
//   try{
//     var newClass = yield Classes.create({
//     	user: '574761f43ce12658159781b3',
//     	monday: [
//     		{
//     			subject: "AI",
// 			    instructor: "Sabah",
// 			    room: "AT2012",
// 			    starttime: "10",
// 			    endtime: "11:30",
//     		}
//     	]
//     });
//   }catch(e){
//     console.log(e);
//   }
// })