'use strict';

var express = require('express');
var router = express.Router();
var posts = require('../controllers/posts');

router.get('/', posts.home);
router.post('/post/create', posts.create);
router.get('/posts', posts.all);
router.delete('/post/:id', posts.remove);
router.get('/post/:id', posts.get);
router.put('/post/:id', posts.update);


module.exports = router;
