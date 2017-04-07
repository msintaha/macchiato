(function () {
    'use strict';

    describe('Publish Controller', function () {
        var scope, controller, postService, $q;

        var response = {
            'title': 'hello world',
            'author': 'jane',
            'body': 'empty',
            'published': false
        };

        beforeEach(module('macchiato'));

        beforeEach(inject(function (_$rootScope_, _$controller_, _postService_, _$q_) {
            $q = _$q_;
            scope = _$rootScope_;
            postService = _postService_;

            spyOn(postService, 'createPost').and.returnValue($q.resolve(response));

            controller = _$controller_('PublishController', {
                $scope: _$rootScope_.$new()
            });
        }));

        afterEach(function () {
            postService.createPost.calls.reset();
        });

        it('should check if controller is defined', function () {
            expect(controller).toBeDefined();
        });

        it('should instantiate newPost object', function () {
            expect(controller.newPost.title).toEqual('');
            expect(controller.newPost.body).toEqual('');
            expect(controller.newPost.author).toEqual('');
            expect(controller.newPost.published).toBeFalsy();
        });

        describe('.createPost', function () {
            it('should create a post successfully', function (done) {
                controller.newPost = {
                    'title': 'hello world',
                    'author': 'jane',
                    'body': 'empty',
                    'published': true
                };
                controller.createPost();
                scope.$digest();
                expect(postService.createPost).toHaveBeenCalledWith(controller.newPost);
                expect(controller.success).toBeTruthy();
                done();
            });
        });

    });
})();