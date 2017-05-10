(function() {
  'use strict';

  angular
    .module('macchiato')
    .controller('PublishController', PublishController);

  /** @ngInject */
  function PublishController(postService, $log) {
    var vm = this;
    vm.success = false;
    vm.error = false;

    vm.newPost = {
      title: '',
      body: '',
      author: '',
      published: false
    };

    vm.createPost = function () {
      postService.createPost(vm.newPost).then(function (response) {
        if(response) {
          vm.success = true;
        } else {
          vm.error = true;
        }
      }).catch(function (err) {
        $log.debug(err);
      });
    };
  }
})();
