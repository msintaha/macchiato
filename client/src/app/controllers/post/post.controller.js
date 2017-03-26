(function() {
  'use strict';

  angular
    .module('appFrontend')
    .controller('PostController', PostController);

  /** @ngInject */
  function PostController(postService, $log, $stateParams, $state) {
    var vm = this;
    vm.id = $stateParams.id;

    postService.getPost(vm.id).then(function (data) {
      vm.postObject = data;
    }).catch(function (err) {
      $log.debug(err);
    });

    vm.delete = function () {
      postService.deletePost(vm.id).then(function (response) {
        $log.debug(response);
        if(response.removed) {
          $state.go('home');
        }
      }).catch(function (err) {
        $log.debug(err);
      });
    };

  }
})();
