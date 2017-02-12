'use strict';
var Post = require('../../models/post');

var home = function(req, res, next) {
  res.render('index', { title: 'Express' });
};

var create = function(req, res, next) {
  var post = new Post(req.body);
  post.save(function(err, post) {
      if (err) { res.send(err); }
      res.json(post);
  });
};

var update = function(req, res, next) {
  var post = new Post(req.body);
  post.save(function(err, post) {
      if (err) { res.send(err); }
      res.json(post);
  });

  Post.findById(req.params.id, function(err, post) {
    if(err) {
      res.send(err);
    } else {
      if(req.body.title) { post.title = req.body.title; }
      if(req.body.body) { post.body = req.body.body; }
      if(req.body.author) { post.author = req.body.author; }
      if(req.body.published) { post.published = req.body.published; }
      post.save().then(function(err, post) {
        res.send(post);
      });
    }
  });
};

var get = function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if(err) { res.send(err); }
    if(post) {
      res.json(post);
    }
  });
}

var remove = function(req, res, next) {
  Post.findByIdAndRemove(req.params.id, function(err, post) {
    res.json({'removed': true});
  });
};

var all = function(req, res, next) {
  Post.find(function(err, posts) {
        if (err) { res.send(err); }
        res.json(posts);
    });
};

module.exports = {
  home,
  create,
  remove,
  update,
  get,
  all
};
