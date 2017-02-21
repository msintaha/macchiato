'use strict';

const base = process.env.PWD;
const Post = require(base + '/models/post');

var home = function(req, res, next) {
  res.render('index', { title: 'Express App' });
};

var createPost = function(req, res) {
  let post = new Post(req.body);
  post.save((err, post) => {
      if (err) { res.send(500, err); }
      res.json(200, post);
  });
};

var updatePost = function(req, res) {
  Post.findById(req.params.id, (err, post) => {
    if(err) {res.send(500, err);}

    if(req.body.title) { post.title = req.body.title; }
    if(req.body.body) { post.body = req.body.body; }
    if(req.body.author) { post.author = req.body.author; }
    if(req.body.published) { post.published = req.body.published; }

    post.save((err, post) => {
      if (err) { res.send(500, err); }
      res.json(200, post);
    });
  });
};

var getPost = function(req, res) {
  Post.findById(req.params.id, (err, post) => {
    if(err) { res.send(500, err); }
    if(post) {
      res.json(200, post);
    }
  });
};

var removePost = function(req, res) {
  Post.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) { res.send(500, err); }
    res.json(200, {'removed': true});
  });
};

var getPosts = function(req, res) {
  Post.find((err, posts) => {
        if (err) { res.send(500, err); }
        res.json(200, posts);
    });
};

module.exports = {
  home,
  createPost,
  removePost,
  updatePost,
  getPost,
  getPosts
};
