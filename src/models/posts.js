var mongoose = require('mongoose');
var postsSchema = require('../schemas/posts');
var Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts;
