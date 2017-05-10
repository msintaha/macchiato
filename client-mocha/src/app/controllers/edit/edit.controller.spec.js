(function () {
    'use strict';

    describe('Edit Controller', function () {
        var scope, controller, postService, $q, $stateParams;

        var response = {
            'title': 'hello world',
            'author': 'jane'
        };

        var editResponse = {
            'title': 'goodbye world',
            'author': 'jane'
        };

        beforeEach(module('macchiato'));

        beforeEach(inject(function (_$rootScope_, _$controller_, _postService_, _$q_, _$stateParams_) {
            $q = _$q_;
            scope = _$rootScope_;
            postService = _postService_;
            $stateParams = _$stateParams_;

            sinon.stub(postService, 'getPost').withArgs($stateParams.id).returns($q.resolve(response));

            controller = _$controller_('EditController', {
                $stateParams: $stateParams,
                $scope: _$rootScope_.$new()
            });
        }));


        it('should check if post id is defined', function () {
            expect(controller).not.to.equal(null);
            expect(controller.id).to.equal($stateParams.id);
        });

        describe('on page load', function () {
            it('should fetch a single post', function () {
                postService.getPost.should.be.calledOnce;
                scope.$digest();
                controller.post.should.equal(response);
                postService.getPost.restore();
            });
        });

        describe('.editPost', function () {
            it('should edit the post', function () {
                controller.post.title = 'goodbye world';
                sinon.stub(postService, 'editPost').withArgs(controller.id, controller.post).returns($q.resolve(editResponse));
                controller.editPost();
                postService.editPost.should.be.calledOnce;
                scope.$digest();
                postService.editPost.restore();
            });
        });

    });
})();