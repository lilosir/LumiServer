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


// clear the database
// Sessions.removeAll(function(err, docs) {
//   console.log(docs);
// })

//show sessions
Sessions.findAll(function (err,session){
  console.log(session);
});

