(function() {
  'use strict';

  describe('Post Service', function() {
    var postService, $httpBackend, $window, headers, authService, fetchedVal, credentials;

    beforeEach(module('appFrontend'));
    beforeEach(inject(function(_postService_, _$httpBackend_, _$window_, _authService_) {
      postService = _postService_;
      $httpBackend = _$httpBackend_;
      $window = _$window_;
      authService = _authService_;
      credentials = {
        username : 'mifta',
        password : 'nothingmuch'
      };
      authService.login(credentials);
      spyOn(authService, 'getCredentials').and.returnValue(credentials);
      fetchedVal = authService.getCredentials();
      headers = {
            'Authorization': 'Basic ' + $window.btoa(credentials.username+':'+credentials.password),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json, text/plain, */*'
          };
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    function _encoder(obj) {
      var str = [];
      for(var p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }

      return str.join('&');
    }

    it("verify if the spy was called", function() {
      expect(authService.getCredentials).toHaveBeenCalled();
    });

    it("return proper value from the spy", function() {
      expect(fetchedVal).toEqual(credentials);
    });

    it('should be registered', function() {
      expect(postService).not.toEqual(null);
    });

    describe('.getPosts', function() {
      it('should get an array of posts', function() {
        $httpBackend.expectGET("http://madkoffee.com/wp-json/wp/v2/posts?per_page=1").respond(200, [{"id": 1908}]);
        postService.getPosts(1).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({id: 1908});
        });
        $httpBackend.flush();
      });
    });

    describe('.getPost', function() {
      it('should get a post object', function() {
        $httpBackend.expectGET("http://madkoffee.com/wp-json/wp/v2/posts/1908").respond(200, [{"id": 1908}]);
        postService.getPost(1908).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({id: 1908});
        });
        $httpBackend.flush();
      });
    });

    describe('.addPost', function() {
      it('should create a post object', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/posts',
            data = _encoder({'title': 'test'});
        $httpBackend.expectPOST(url, data, headers).respond(201, [{'title':{'raw': 'test','rendered': 'test'}}]);
        postService.addPost(data).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({title: {raw: 'test', rendered: 'test'}});
        });
       $httpBackend.flush();
      });
    });

    describe('.editPost', function() {
      it('should edit a post object', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/posts/1908',
            data = _encoder({'title': {rendered:'Test'}});
        $httpBackend.expectPUT(url, data, headers).respond(200, [{'title':{'rendered': 'Test'}}]);
        postService.editPost(1908, data).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({title: {rendered: 'Test'}});
        });
       $httpBackend.flush();
      });
    });

    describe('.deletePost', function() {
      it('should delete a post object', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/posts/1908';
        $httpBackend.expectDELETE(url, headers).respond(200);
        postService.deletePost(1908).then(function(data) {
          expect(data).toBeUndefined();
        });
       $httpBackend.flush();
      });
    });
  });
})();
