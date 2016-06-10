'use strict';

var mongoose = require('mongoose');
mongoose.plugin(require('./baseSchema'));
var Schema = mongoose.Schema;

var Posts = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  category: String,
  body: {
    subject: String,
    text: String,
    image: [{ uri: String }]
  },
  like: Number,
  comments: [{
    by: { type: Schema.Types.ObjectId, ref: "Users" },
    content: String
  }]
});

module.exports = Posts;