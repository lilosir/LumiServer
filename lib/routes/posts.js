'use strict';

var express = require('express');
var router = express.Router();
var Posts = require('../controller/Posts');

router.post('/createPost/:id', Posts.createPost);

router.get('/getPosts', Posts.getPosts);

router.post('/likeOrDislike/:id', Posts.likeOrDislike);

module.exports = router;