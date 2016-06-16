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
var Posts = require('../models/posts');

// clear the database
// Posts.remove({},function(err, docs) {
//   console.log(docs);
// })

//show Posts
// Posts.find({},function (err,post){
//   console.log(post);
// });

Posts.find({ category: "market" }, function (err, post) {
  console.log(post);
});

// var post = new Posts({
// 	user:"574761f43ce12658159781b3",
// 	category:"publicPost",
// 	body:{
// 		subject: "first post",
// 		text:"I feel really good that I have made this app!",
//   		image:[{uri:"http://www.bbb.com/app.png"},
//   			   {uri: "http://www.bbb.com/app123.png"}],
// 	}});
// post.save(function (err, post) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(post);
// });

//find older news
// var date = new Date();
// Posts.find({
//           category:'publicPost',
//           created_at: {$gt: '2016-06-12T03:34:36.665Z' }}).sort('-created_at').limit(5).populate("user","avatar nickname")
// .exec(function(err, docs){
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(docs)
// 	}
// })

// Posts.findById('575b1a0fa10feb5037a76929').exec(function(err, docs){
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(docs)
// 	}
// })

// Posts.findByIdAndUpdate('575f0a85243f80245e871dae',
// 	{$pull: {'like':'574761f43ce12658159781b3'}},
// 	{safe: true, upsert: true})
// 	.exec(function(err, docs){
// 		if(err){
// 			console.log(err)
// 		}else{
// 			console.log(docs)
// 		}
// 	});

// Posts.findOne({_id: '575f0a85243f80245e871dae', like: '574761f43ce12658159781b3'}).exec(function(err, docs){
// 		if(err){
// 			console.log(err)
// 		}else{
// 			console.log(docs)
// 		}
// 	});

// Posts.findByIdAndUpdate('5762128bbe1c05a42eb05f2f', {$set: {'body.origin': '200'}})
// 	.exec(function(err, docs){
// 		if(err){
// 			console.log(err)
// 		}else{
// 			console.log(docs)
// 		}
// 	});

// Posts.findOne({_id: '575ef64f14235f804efe5835'}).exec(function(err, docs){
// 		if(err){
// 			console.log(err)
// 		}else{
// 			console.log(docs)
// 		}
// 	});