(function () {
    'use strict';

    xdescribe('Main Controller', function () {
        var controller;

        beforeEach(module('macchiato'));

        beforeEach(inject(function (_$rootScope_, _$controller_) {
            controller = _$controller_('MainController', {
                $scope: _$rootScope_.$new()
            });
        }));

        it('should check if post id is defined', function () {
            expect(controller).toBeDefined();
        });
    });
})();