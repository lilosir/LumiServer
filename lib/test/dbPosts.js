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
// Posts.removeAll(function(err, docs) {
//   console.log(docs);
// })

//show Posts
Posts.find({}, function (err, post) {
  console.log(post);
});