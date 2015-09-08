'use strict';

describe('Controller: Dnd35Ctrl', function () {

  // load the controller's module
  beforeEach(module('chargenNgApp'));

  var Dnd35Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Dnd35Ctrl = $controller('Dnd35Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Dnd35Ctrl.awesomeThings.length).toBe(3);
  });
});
