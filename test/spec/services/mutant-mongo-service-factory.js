'use strict';

describe('Service: mutantMongoServiceFactory', function () {

  // load the service's module
  beforeEach(module('chargenNgApp'));

  // instantiate service
  var mutantMongoServiceFactory;
  beforeEach(inject(function (_mutantMongoServiceFactory_) {
    mutantMongoServiceFactory = _mutantMongoServiceFactory_;
  }));

  it('should do something', function () {
    expect(!!mutantMongoServiceFactory).toBe(true);
  });

});
