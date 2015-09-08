'use strict';

describe('Controller: SvavelvinterCtrl', function () {

  // load the controller's module
  beforeEach(module('chargenNgApp'));

  var SvavelvinterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SvavelvinterCtrl = $controller('SvavelvinterCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SvavelvinterCtrl.awesomeThings.length).toBe(3);
  });
});
