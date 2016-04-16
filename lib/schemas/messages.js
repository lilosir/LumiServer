'use strict';

var mongoose = require('mongoose');
// var Users = require('../models/users');
mongoose.plugin(require('./baseSchema'));
var Schema = mongoose.Schema;

var Messages = new Schema({
  // user: {type: Schema.Types.ObjectId, ref:"Users"},
  // message: [{withwhom: String, content: String, fromMe: boolean, date: {type:Date, default: new Date()},}]
  from: { type: Schema.Types.ObjectId, ref: "Users" },
  to: { type: Schema.Types.ObjectId, ref: "Users" },
  message: String
});

module.exports = Messages;

// Messages.find({ from: 'ni', to: 'wangtong' } huozhe { from: 'wangtong', to: 'ni' }).sortbyDate()
// Messages.find({ from: 'wangtong', to: 'ni' })