'use strict';

var express = require('express');
var router = express.Router();
var Messages = require('../controller/Messages');

// get earlier messages
router.get('/', Messages.getEarlierMessages);

// to store the gcm token from client
router.post('/register', Messages.register);

module.exports = router;