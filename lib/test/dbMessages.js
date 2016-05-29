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
var Messages = require('../models/messages');

// clear
Messages.remove({}, function (err, docs) {
  if (err) {
    console.log(err);
  } else {
    console.log(docs);
  }
});

// Messages.find({}, function(err, docs){
//   if(err){
//     console.log(err);
//   }else{
//   	console.log(docs)
//   	// for (var i = 0; i < docs.length; i++) {
//   	// 	console.log(docs[i]);
//   	// }

//   }
// });

// Messages.findOne({from: '574761f43ce12658159781b3', to: '574761f43ce12658159781b4', 'contents.text': "11", 'contents.uniqueId':'123'}, function(err, docs){
//   if(err){
//     console.log(err);
//   }else{
//   	console.log(docs)
//   }
// });

// Messages.findOne({from:'574761f43ce12658159781b3'}, function(err, docs){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(docs);
//   }
// })

// Messages.find({
// 	from:'572281817d75053030dff678',
// 	to: '572281817d75053030dff679',
// 	"contents.date": {$lt: new Date(2016, 0, 4, 20, 0) }},function(err, docs){
//   if(err){
//     console.log(err);
//   }else{
//     for (var i = 0; i < docs.length; i++) {
//   		console.log(docs[i]);
//   	}
//   }
// }).sort({'contents.date': 1}).limit(5);