'use strict';

var mongoose = require('mongoose');
var gcmSchema = require('../schemas/gcms');
var Gcms = mongoose.model('Gcms', gcmSchema);

module.exports = Gcms;