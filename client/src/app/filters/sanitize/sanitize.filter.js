(function () {
  'use strict';

  angular
    .module('macchiato')
    .filter('trusted', htmlSanitizer);

  /** @ngInject */
  function htmlSanitizer($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
  }
})();
