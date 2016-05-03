var express = require('express');
var router = express.Router();
var Messages = require('../controller/Messages')

/* GET users listing. */
router.get('/', Messages.getEarlierMessages);

module.exports = router;