'use strict';

var mongoose = require('mongoose');
var gcmSchema = require('../schemas/gcm');
var Gcm = mongoose.model('gcm', gcmSchema);

module.exports = Gcm;