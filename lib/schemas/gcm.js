'use strict';

var mongoose = require('mongoose');
// var Users = require('../models/users');
mongoose.plugin(require('./baseSchema'));
var Schema = mongoose.Schema;

var Gcm = new Schema({
  token: String,
  users: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  from: { type: Schema.Types.ObjectId, ref: "Users" },
  to: { type: Schema.Types.ObjectId, ref: "Users" },
  message: String
});

module.exports = Gcm;

// Messages.find({ from: 'ni', to: 'wangtong' } huozhe { from: 'wangtong', to: 'ni' }).sortbyDate()
// Messages.find({ from: 'wangtong', to: 'ni' })