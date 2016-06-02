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
var Notifications = require('../models/notifications');


// clear the database
// Notifications.remove({},function(err, docs) {
//   console.log(docs);
// })

//show notifications
// Notifications.find({}, function(err, docs){
// 	if(err){
// 		console.log(err)
// 	}else{
// 		// console.log(docs[0].contents);
// 		console.log(docs[0])

// 	}
// }).populate('contents.from', 'avatar nickname');

//update one piece notification to read
// Notifications.findOneAndUpdate({
// 	user: '574761f43ce12658159781b3', 
// 	'contents.from': '574761f43ce12658159781b5',
// 	'contents.classificaiton': 'addFriendRequest',
// 	'contents.ifread': true},
// 	{$set: {'contents.$.ifread': false}}, function(err, docs){
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(docs)
// 	}});

