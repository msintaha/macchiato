(function() {
  'use strict';

  angular
    .module('macchiato')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
