'use strict';

var mongoose = require('mongoose');
var notificationSchema = require('../schemas/notifications');
var Notifications = mongoose.model('Notifications', notificationSchema);

module.exports = Notifications;