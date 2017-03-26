(function() {
  'use strict';

  describe('Main controller', function() {
    var vm;

    beforeEach(module('appFrontend'));
    beforeEach(inject(function(_$controller_) {
      vm = _$controller_('MainController');
    }));

    it('should contain a list', function() {
      expect(angular.isArray(vm.someList)).toBeTruthy();
      expect(vm.someList.length === 2).toBeTruthy();
    });
  });
})();
