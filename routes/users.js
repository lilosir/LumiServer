var express = require('express');
var Users = require('../models/users');
var router = express.Router();
var loginUsers = require('../controller/loginUsers')

var data;
/* GET users listing. */
router.post('/', loginUsers.registers);

router.get('/', loginUsers.renderUsers);

router.get('/:id/verification', loginUsers.verifyUser);

module.exports = router;
