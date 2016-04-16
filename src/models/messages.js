var mongoose = require('mongoose');
var messagesSchema = require('../schemas/messages');
var Messages = mongoose.model('Messages', messagesSchema);

module.exports = Messages;
