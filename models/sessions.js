var mongoose = require('mongoose');
var sessions = require('../schemas/sessions');
var Sessions = mongoose.model('Sessions', sessions);

module.exports = Sessions;
