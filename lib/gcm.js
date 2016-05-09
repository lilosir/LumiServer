'use strict';

var gcm = require('node-gcm');

var message = new gcm.Message();

message.addData('key1', 'msg1');

var regTokens = [];

// Set up the sender with you API key
var sender = new gcm.Sender('AIzaSyBIJ9RzACFiwnkRorMEQJjrQFRhY6gaeqc');

// Now the sender can be used to send messages
sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if (err) console.error(err);else console.log("gcm registrationTokens response:", response);
});

// Send to a topic, with no retry this time
sender.sendNoRetry(message, { topic: '/topics/global' }, function (err, response) {
    if (err) console.error(err);else console.log("gcm noretry response:", response);
});