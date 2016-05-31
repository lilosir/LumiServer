'use strict';

var mongoose = require('mongoose');
mongoose.plugin(require('./baseSchema'));
var Schema = mongoose.Schema;

var Notifications = new Schema({

  user: { type: Schema.Types.ObjectId, ref: "Users" },
  contents: [{
    from: { type: Schema.Types.ObjectId, ref: "Users" },
    classificaiton: String,
    text: String,
    ifread: Boolean
  }]

});

module.exports = Notifications;