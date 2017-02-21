'use strict';

const express = require('express'),
 router = express.Router(),
 posts = require('../../controllers/posts');

router.get('/', posts.home);
router.post('/post/create', posts.createPost);
router.get('/posts', posts.getPosts);
router.delete('/post/:id', posts.removePost);
router.get('/post/:id', posts.getPost);
router.put('/post/:id', posts.updatePost);


module.exports = router;
