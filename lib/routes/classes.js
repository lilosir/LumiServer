'use strict';

var express = require('express');
var router = express.Router();
var Classes = require('../controller/Classes');

router.post('/updateclasses/:id', Classes.updateclasses);

router.get('/getclasses/:id', Classes.getclasses);

module.exports = router;