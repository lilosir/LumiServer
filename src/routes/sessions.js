var express = require('express');
var router = express.Router();
var checkSession = require('../controller/checkSession')

/* GET users listing. */
router.post('/', checkSession.getSession);

module.exports = router;