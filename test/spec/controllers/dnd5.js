'use strict';

describe('Controller: Dnd5Ctrl', function () {

  // load the controller's module
  beforeEach(module('chargenNgApp'));

  var Dnd5Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Dnd5Ctrl = $controller('Dnd5Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(Dnd5Ctrl.awesomeThings.length).toBe(3);
  });
});
