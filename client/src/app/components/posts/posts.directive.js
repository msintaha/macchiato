(function() {
  'use strict';

  angular
    .module('appFrontend')
    .directive('posts', postsDirective);

  /** @ngInject */
  function postsDirective() {
    var directive = {
      restrict: 'E',
      bindToController: true,
      templateUrl: 'app/components/posts/posts.html',
      controller: PostController,
      controllerAs: 'posts'
    };

    return directive;

    /** @ngInject */
    function PostController($log, postService) {
      var vm = this;

      postService.getPosts().then(function(data) {
        $log.debug(data);
        vm.posts = data;
      }).catch(function (err) {
        $log.debug(err);
      });

    }
  }
})();
