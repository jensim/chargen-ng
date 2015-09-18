'use strict';

describe('Directive: diceroller', function () {

    // load the directive's module
    beforeEach(module('chargenNgApp'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
        element = angular.element('<diceroller></diceroller>');
        element = $compile(element)(scope);
        //expect(element.text()).toBe('this is the diceroller directive');
    }));
});
