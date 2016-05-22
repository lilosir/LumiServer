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

router.get('/myself/:id', Users.getMyself);

router.post('/login', Users.login);

router.get('/', Users.renderUsers);

router.get('/:id/verification', Users.activateUser);

router.get('/userfriends/:id', Users.getUserFriends);

router.get('/searchFriends', Users.searchFriends);

router.post('/updateRecent/:id', Users.updateRecent);

router.get('/getRecent/:id', Users.getRecent);

router.get('/getOne', Users.queryOne);

module.exports = router;