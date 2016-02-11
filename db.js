
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lumi');
var db = mongoose.connection;
db.on('error',function (err){
  consolo.log(err);
})

db.on('disconnected', function (){
  console.log('Datebase disconnected!!');
})

var Users = require('./models/users');

Users.removeAll(function(err, docs) {
  console.log(docs);
})