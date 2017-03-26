(function() {
  'use strict';

  describe('Post directive', function() {
    var scope, compile, directiveElem;

    beforeEach(module('appFrontend'));
    beforeEach(inject(function(_$rootScope_, _$compile_) {
      compile = _$compile_;
      scope = _$rootScope_.$new();
      directiveElem = _compileElem();
    }));

    function _compileElem() {
      var element = angular.element('<posts></posts>');
      var compiledElement = compile(element)(scope);
      scope.$digest();
      return compiledElement;
    }

    it('should exist', function () {
      expect(directiveElem).not.toEqual(null);
    });

    it('should have applied the html template', function() {
      expect(directiveElem.html()).not.toEqual('');
    });

  });
})();
