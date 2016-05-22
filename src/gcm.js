var gcm = require('node-gcm');

// var message = new gcm.Message();
var message = new gcm.Message({
    collapseKey: 'demo',
    priority: 'high',
    contentAvailable: true,
    // delayWhileIdle: true,
    timeToLive: 3,
    // dryRun: true,
    data: {
        key1: 'message1',
        key2: 'message2'
    },
});


message.addData('key1', 'msg1');

var regTokens = ['doR1_AtU_6Q:APA91bH5YL4-1NF-Kn4XaMwtnZK4U5zKqDrQDkrxP2zU5FLsehsSdh57c1_yWgD0fZPBEPjyN8dT6kOqBiEjhyaJg1sTMZJvAsdz4H_fXpeOmyYjo8VGd7f7ukcuLlsnAxbEwEOuw-ln'];

// Set up the sender with you API key
var sender = new gcm.Sender('AIzaSyD5f7HQE8I6IJNGaJAbPjL8qBYUThz83dA');

// Now the sender can be used to send messages
sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if(err) console.error(err);
    else    console.log("gcm registrationTokens response:",response);
});

// Send to a topic, with no retry this time
sender.sendNoRetry(message, { topic: '/topics/global' }, function (err, response) {
    if(err) console.error(err);
    else    console.log("gcm noretry response:",response);
});