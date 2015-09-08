'use strict';

describe('Controller: DodCtrl', function () {

  // load the controller's module
  beforeEach(module('chargenNgApp'));

  var DodCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DodCtrl = $controller('DodCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(DodCtrl.awesomeThings.length).toBe(3);
  });
});
