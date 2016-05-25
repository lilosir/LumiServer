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

Messages.find({}, function(err, docs){
  if(err){
    console.log(err);
  }else{

  	for (var i = 0; i < docs.length; i++) {
  		console.log(docs[i].contents);
  	}
    
  }
});

// Messages.findById('574228c71b42670c323c73bd', function(err, docs){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(docs);
//   }
// }).populate('contents');

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
