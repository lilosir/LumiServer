var express = require('express');
var router = express.Router();
var Messages = require('../controller/Messages')

// get earlier messages
// router.get('/', Messages.getEarlierMessages);

router.post('/register', Messages.register);

router.post('/sendMessages/:id', Messages.sendMessages);

module.exports = router;