'use strict';
process.env.NODE_ENV = 'test';

const base = process.env.PWD;
const config = require(base + '/config'),
    logger = require('mocha-logger'),
    mongoose = require('mongoose'),
    posts = require(base + '/controllers/posts'),
    Post = require(base + '/models/post'),
    should = require('should'),
    testUtils = require(base + '/test/utils');

describe("Post api", () => {
  let id, dummyPost;

  before((done) => {
      mongoose.connect(config.testDb, () => {
          console.log('Connected to: '+ config.testDb);
          done();
      });

      dummyPost = new Post({
        'title': 'dummy',
        'author': 'someone',
        'body': 'Lorem ipsum dior'
      });
      
      dummyPost.save((err, post) => {
          if (err) { res.send(err); }
          id = post._id;
      });
  });

  describe("Create Post", () => {
      it("should create a new post", (done) => {
        let req = {
          body : {'title': 'bleh'}
        };

        let res = testUtils.responseValidatorAsync(200, (post) => {
          post.should.have.property('title');
          post.title.should.equal('bleh');
          done();
        });

        posts.createPost(req, res);
      });
  });

  describe("GET Posts", () => {
      it("should respond with an array of posts", (done) => {
        let req = {};

        let res = testUtils.responseValidatorAsync(200, (posts) => {
          posts.length.should.equal(2);
          posts[0].should.have.property('title');
          done();
        });

        posts.getPosts(req, res);
      });
  });

  describe("GET Post", () => {
      it("should get a post by id", (done) => {
        let req = {
          params : {id: id}
        };

        let res = testUtils.responseValidatorAsync(200, (post) => {
          post.title.should.equal('dummy');
          post.should.have.property('title');
          done();
        });

        posts.getPost(req, res);
      });

      it("should throw an error for invalid id", (done) => {
        let req = {
          params : {id: '23545'}
        };

        let res = testUtils.responseValidatorAsync(500, function (err) {
          done();
        });

        posts.getPost(req, res);
      });
  });

  describe("Update Post", function() {
      it("should update an existing post", (done) => {
        let req = {
          params: {id: id},
          body: {
            'title': 'hey there peeps'
          }
        };

        let res = testUtils.responseValidatorAsync(200, (post) => {
          post.should.have.property('title');
          post.title.should.equal('hey there peeps');
          done();
        });

        posts.updatePost(req, res);
      });
  });

  describe("Delete Post", function() {
      it("should delete an existing post", (done) => {
        let req = {
          params: {id: id},
        };

        let res = testUtils.responseValidatorAsync(200, (post) => {
          post.should.have.property('removed');
          post.removed.should.equal(true);
          done();
        });

        posts.removePost(req, res);
      });
  });

  after((done) => {
      Post.remove({}, (err) => {
        if(err) {console.log(err);}
      });

      mongoose.disconnect(done);
  });

});
