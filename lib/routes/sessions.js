'use strict';

var express = require('express');
var router = express.Router();
var Sessions = require('../controller/Sessions');

// get a session
router.post('/', Sessions.getSession);

module.exports = router;