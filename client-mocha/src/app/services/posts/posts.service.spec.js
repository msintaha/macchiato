(function() {
  'use strict';

  describe('Post Service', function() {
    var postService, $httpBackend, config;

    beforeEach(module('macchiato'));
    beforeEach(inject(function(_postService_, _$httpBackend_, _config_) {
      postService = _postService_;
      $httpBackend = _$httpBackend_;
      config = _config_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation(false);
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be registered', function() {
      postService.should.not.equal(null);
    });

    describe('.getPosts', function() {
      it('should get an array of posts successfully', function(done) {

        $httpBackend.expect('GET', config.apiUrl + 'posts')
            .respond(200,
                {
                  title : 'hello world',
                  author  : 'john doe'
                }
            );

        postService.getPosts().then( function ( data ) {
          data.title.should.equal('hello world');
          done();
        });

        $httpBackend.flush();
      });
    });

    describe('.createPost', function() {
      it('should get an array of posts successfully', function(done) {

          var post = {
              title : 'hello world',
              author  : 'john doe'
          };
        $httpBackend.expect('POST', config.apiUrl + 'post/create')
            .respond(200, post);

        postService.createPost(post).then( function ( data ) {
          data.title.should.equal('hello world');
          done();
        });

        $httpBackend.flush();
      });
    });

  });
})();