'use strict';

var express = require('express');
var Users = require('../models/users');
var router = express.Router();
var Users = require('../controller/Users');

var data;

// get "/" => get user list
// get "/:id"  => get user by id
// get "/" => ?query=fwefwe
/* GET users listing. */
router.post('/', Users.registers);

router.post('/login', Users.login);

router.get('/', Users.renderUsers);

router.get('/:id/verification', Users.activateUser);

router.get('/userfriends/:id', Users.getUserFriends);

router.get('/searchFriends', Users.searchFriends);

module.exports = router;