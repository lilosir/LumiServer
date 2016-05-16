var express = require('express');
var router = express.Router();
var Gcm = require('../controller/Gcm');

router.post('/register', Gcm.register);

module.exports = router;