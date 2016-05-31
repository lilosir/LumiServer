var express = require('express');
var router = express.Router();
var Notifications = require('../controller/Notifications')

router.get('/getnotifications/:id', Notifications.getnotifications);

module.exports = router;