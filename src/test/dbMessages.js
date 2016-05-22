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

var Gcms = require('../models/googleCloudMessaging');


// clear
// Messages.remove({},function(err, docs){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(docs);
//   }
// });

// Messages.find({}, function(err, docs){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(docs);
//   }
// });

Messages.findById('574228c71b42670c323c73bd', function(err, docs){
  if(err){
    console.log(err);
  }else{
    console.log(docs);
  }
}).populate('contents');

