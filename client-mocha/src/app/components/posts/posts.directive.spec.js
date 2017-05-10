(function() {
  'use strict';

  describe('Posts Directive', function() {
        var postService, $q, scope, element, compile, directiveCtrl;

        var result = [{
          'id': 1,
          'title': 'dummy',
          'author': 'may'
        }, {
          'id': 1,
          'title': 'world',
          'author': 'john'
        }];

        beforeEach(module('macchiato'));

        beforeEach(inject(function(_$controller_, _postService_, _$q_, _$rootScope_, _$compile_) {
          postService = _postService_;
          $q = _$q_;
          compile = _$compile_;
          scope = _$rootScope_.$new();
          element = angular.element("<posts></posts>");
          compile(element)(scope);

          sinon.stub(postService, 'getPosts').returns($q.resolve(result));
          scope.$digest();
          directiveCtrl = element.controller('posts');
        }));

        afterEach(function() {
            postService.getPosts.restore();
        });

        it('should apply template', function () {
            expect(element.html()).not.to.equal('');
        });

        it ('should define controller', function () {
            expect(directiveCtrl).not.to.equal(null);
        });

        describe(".activate", function() {
              it("should fetch posts", function(done) {
                    directiveCtrl.activate();
                    postService.getPosts.should.be.calledOnce;
                    done();
              });
        });

  });
})();