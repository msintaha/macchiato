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

            spyOn(postService, 'getPost').and.returnValue($q.resolve(response));
            spyOn(postService, 'editPost').and.returnValue($q.resolve(editResponse));

            controller = _$controller_('EditController', {
                $stateParams: $stateParams,
                $scope: _$rootScope_.$new()
            });
        }));

        afterEach(function () {
            postService.getPost.calls.reset();
            postService.editPost.calls.reset();
        });

        it('should check if post id is defined', function () {
            expect(controller).toBeDefined();
            expect(controller.id).toEqual($stateParams.id);
        });

        describe('on page load', function () {
            it('should fetch a single post', function (done) {
                expect(postService.getPost).toHaveBeenCalledWith(controller.id);
                scope.$digest();
                expect(controller.post).toEqual(response);
                done();
            });
        });

        describe('.editPost', function () {
            it('should edit the post', function (done) {
                controller.post.title = 'goodbye world';
                controller.editPost();
                expect(postService.editPost).toHaveBeenCalledWith(controller.id, controller.post);
                done();
            });
        });

    });
})();