require("babel-polyfill");
var co = require("co");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lumi');

var db = mongoose.connection;
db.on('error',function (err){
  console.log(err);
})

db.on('disconnected', function (){
  console.log('Datebase disconnected!!');
})

var Users = require('../models/users');
var Sessions = require('../models/sessions');
var Messages = require('../models/messages');

var Gcms = require('../models/gcms');

// clear
// Gcms.remove({},function(err, docs){
//   if(err){
//     console.log(e);
//   }else{
//     console.log(docs);
//   }
// });

Gcms.find({}, function(err, docs){
  if(err){
    console.log(e);
  }else{
    console.log(docs);
  }
});

//findone
// Gcms.findOne({token:"abc123", users: "5727944838d4ff801774bdc5"},function(err, docs){
//   if(err){
//     console.log(e);
//   }else{
//     console.log(docs);
//   }
// });

// Gcms.findOne({token:"abc123"},function(err, docs){
//   if(err){
//     console.log(e);
//   }else{
//     console.log(docs);
//   }
// });

// push a user
// Gcms.findOneAndUpdate({token:"abc123"}, 
//         {$push:{'users': {_id: '572794407b9e0cd4185948d3'}}},function(err, docs){
//   if(err){
//     console.log(e);
//   }else{
//     console.log(docs);
//   }
// });

// var gcm = new Gcms({token:"123abc", users: [{_id:'5727944838d4ff801774bdc5'}]});
// gcm.save(function (err, gcm) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(gcm);
// });
