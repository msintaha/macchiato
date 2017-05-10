(function () {
    'use strict';

    describe('Post Controller', function () {
        var scope, controller, postService, $q, $stateParams;

        var response = {
            'title': 'hello world',
            'author': 'jane'
        };

        var deleteResponse = {
            'removed': true
        };

        beforeEach(module('macchiato'));

        beforeEach(inject(function (_$rootScope_, _$controller_, _postService_, _$q_, _$stateParams_) {
            $q = _$q_;
            scope = _$rootScope_;
            postService = _postService_;
            $stateParams = _$stateParams_;

            sinon.stub(postService, 'getPost').returns($q.resolve(response));

            controller = _$controller_('PostController', {
                $stateParams: $stateParams,
                $scope: _$rootScope_.$new()
            });

            sinon.stub(postService, 'deletePost').withArgs(controller.id).returns($q.resolve(deleteResponse));
        }));

        afterEach(function () {
            postService.getPost.restore();
            postService.deletePost.restore();
        });

        it('should check if post id is defined', function () {
            expect(controller).not.to.equal(null);
            expect(controller.id).to.equal($stateParams.id);
        });

        describe('.onLoad', function () {
            it('should fetch a single post', function (done) {
                controller.onLoad();
                postService.getPost.should.be.calledOnce;
                scope.$digest();
                controller.postObject.should.equal(response);
                done();
            });
        });

        describe('.delete', function () {
            it('should delete a single post', function (done) {
                controller.delete();
                postService.deletePost.should.be.calledOnce;
                done();
            });
        });

    });
})();