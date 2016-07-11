'use strict';

var mongoose = require('mongoose');
var classesSchema = require('../schemas/classes');
var Classes = mongoose.model('Classes', classesSchema);

module.exports = Classes;