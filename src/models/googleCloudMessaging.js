var mongoose = require('mongoose');
var gcmSchema = require('../schemas/googleCloudMessaging');
var GoogleCloudMessaging = mongoose.model('GoogleCloudMessaging', gcmSchema);

module.exports = GoogleCloudMessaging;
