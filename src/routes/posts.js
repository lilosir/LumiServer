var express = require('express');
var router = express.Router();
var Posts = require('../controller/Posts')

// get earlier messages
// router.get('/', Messages.getEarlierMessages);

router.post('/createPost/:id', Posts.createPost);

module.exports = router;