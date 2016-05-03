var express = require('express');
var router = express.Router();
var Sessions = require('../controller/Sessions')

/* GET users listing. */
router.post('/', Sessions.getSession);

module.exports = router;