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

            controller = _$controller_('PublishController', {
                $scope: _$rootScope_.$new()
            });

        }));

        it('should check if controller is defined', function () {
            expect(controller).not.to.equal(null);
        });

        it('should instantiate newPost object', function () {
            controller.newPost.title.should.equal('');
            controller.newPost.body.should.equal('');
            controller.newPost.author.should.equal('');
            controller.newPost.published.should.be.false;
        });

        describe('.createPost', function () {
            it('should create a post successfully', function () {
                controller.newPost = {
                    'title': 'hello world',
                    'author': 'jane',
                    'body': 'empty',
                    'published': true
                };

                sinon.stub(postService, 'createPost').withArgs(controller.newPost).returns($q.resolve(response));
                controller.createPost();
                postService.createPost.should.be.calledOnce;
                scope.$digest();
                controller.success.should.be.true;
                postService.createPost.restore();
            });
        });

    });
})();