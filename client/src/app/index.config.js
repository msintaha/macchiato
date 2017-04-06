(function() {
  'use strict';

  angular
    .module('appFrontend')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider) {
    $logProvider.debugEnabled(true);

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }

})();
