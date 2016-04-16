'use strict';

var express = require('express');
var router = express.Router();
var getEarlierMessages = require('../controller/getEarlierMessages');

/* GET users listing. */
router.get('/', getEarlierMessages.getEarlierMessages);

module.exports = router;