'use strict';

describe('Controller: MutantCtrl', function () {

  // load the controller's module
  beforeEach(module('chargenNgApp'));

  var MutantCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MutantCtrl = $controller('MutantCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(MutantCtrl.awesomeThings.length).toBe(3);
  });
});
