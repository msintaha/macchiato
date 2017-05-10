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

            spyOn(postService, 'getPost').and.returnValue($q.resolve(response));
            spyOn(postService, 'deletePost').and.returnValue($q.resolve(deleteResponse));

            controller = _$controller_('PostController', {
                $stateParams: $stateParams,
                $scope: _$rootScope_.$new()
            });
        }));

        afterEach(function () {
            postService.getPost.calls.reset();
            postService.deletePost.calls.reset();
        });

        it('should check if post id is defined', function () {
            expect(controller).toBeDefined();
            expect(controller.id).toEqual($stateParams.id);
        });

        describe('.onLoad', function () {
            it('should fetch a single post', function (done) {
                controller.onLoad();
                expect(postService.getPost).toHaveBeenCalledWith(controller.id);
                scope.$digest();
                expect(controller.postObject).toEqual(response);
                done();
            });
        });

        describe('.delete', function () {
            it('should delete a single post', function (done) {
                controller.delete();
                expect(postService.deletePost).toHaveBeenCalledWith(controller.id);
                done();
            });
        });

    });
})();