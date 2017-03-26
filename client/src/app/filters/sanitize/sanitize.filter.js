(function () {
  'use strict';

  angular
    .module('appFrontend')
    .filter('trusted', htmlSanitizer);

  /** @ngInject */
  function htmlSanitizer($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
  }
})();
