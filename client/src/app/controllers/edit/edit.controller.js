(function() {
  'use strict';

  angular
    .module('appFrontend')
    .controller('EditController', EditController);

  /** @ngInject */
  function EditController(postService, $log, $stateParams, $state) {
    var vm = this,
      id = $stateParams.id;

    vm.error = false;

    postService.getPost(id).then(function (data) {
      vm.post = data;
    }).catch(function (err) {
      $log.debug(err);
    });

    vm.editPost = function () {
      postService.editPost(id, vm.post).then(function (response) {
        if(response) {
          $state.go('post', {id: id});
        } else {
          vm.error = true;
        }
      }).catch(function (err) {
        $log.debug(err);
      });
    };
  }
})();
