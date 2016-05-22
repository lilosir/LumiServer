'use strict';

var mongoose = require('mongoose');
var gcmSchema = require('../schemas/gcms');
var Gcm = mongoose.model('Gcm', gcmSchema);

module.exports = Gcm;