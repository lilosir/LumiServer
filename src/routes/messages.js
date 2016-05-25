var express = require('express');
var router = express.Router();
var Messages = require('../controller/Messages')

// get earlier messages
// router.get('/', Messages.getEarlierMessages);

router.post('/register', Messages.register);

router.post('/sendMessages/:id', Messages.sendMessages);

router.post('/storeMessages/:id', Messages.storeMessages);

router.get('/getEarlierMessages', Messages.getEarlierMessages);

module.exports = router;