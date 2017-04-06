(function() {
  'use strict';

  angular
    .module('macchiato')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/controllers/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('publish',{
        url: '/publish',
        templateUrl: 'app/controllers/publish/publish.html',
        controller: 'PublishController',
        controllerAs: 'publish'
      })
      .state('post',{
        url: '/post/:id',
        templateUrl: 'app/controllers/post/post.html',
        controller: 'PostController',
        controllerAs: 'post'
      })
      .state('edit',{
        url: '/edit/post/:id',
        templateUrl: 'app/controllers/edit/edit.html',
        controller: 'EditController',
        controllerAs: 'edit'
      });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  }

})();
