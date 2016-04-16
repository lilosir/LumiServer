'use strict';

var mongoose = require('mongoose');
// var Users = require('../models/users');
mongoose.plugin(require('./baseSchema'));
var Schema = mongoose.Schema;

var sessions = new Schema({
  session_token: String,
  expire_At: { type: Date, default: new Date(new Date().getTime() + 2 * 7 * 24 * 60 * 60 * 1000) },
  user: { type: Schema.Types.ObjectId, ref: "Users" }
});

sessions.statics = {

  removeAll: function removeAll(cb) {
    return this.remove({}).exec(cb);
  },

  findAll: function findAll(cb) {
    return this.find({}).exec(cb);
  }

};

// findByUsername: function (username, cb){
//   return this.findOne({'user.username':username}).exec(cb);
// },

module.exports = sessions;