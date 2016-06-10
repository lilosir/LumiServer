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
var Posts = require('../models/posts');


// clear the database
// Posts.remove({},function(err, docs) {
//   console.log(docs);
// })

//show Posts
Posts.find({},function (err,post){
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