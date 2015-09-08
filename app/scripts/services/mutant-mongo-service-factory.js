'use strict';

/**
 * @ngdoc service
 * @name chargenNgApp.mutantMongoServiceFactory
 * @description
 * # mutantMongoServiceFactory
 * Factory in the chargenNgApp.
 */
angular.module('chargenNgApp')
    .factory('mutantMongoServiceFactory', ['$http', function ($http) {
        // Service logic
        // ...
        var klasses = {
            imm: {
                name: 'Icke muterad människa',
                sp: 91,
                description: 'Upper crust'
            },
            mm: {
                name: 'Muterad m&auml;nniska',
                sp: 84,
                description: 'L&ouml;skefolket'
            },
            psi: {
                name: 'Psi-mutant',
                sp: 84,
                description: 'Farliga'
            },
            rbt: {
                name: 'Robot',
                sp: 84,
                description: 'Tj&auml;aren och underverket'
            }
        };

        var jobs = {
            bonde: {
                name: 'Bonde',
                description: 'jobba m jord o lort'
            }
        };

        // Public API here
        return {
            getCharacters: function () {
                return [{
                    name: 'one',
                    klass: klasses.imm,
                    job: jobs.bonde
                }];
            },
            getClasses: function () {
                return klasses;
            },
            getJobs: function () {
                return jobs;
            }
        };
    }]);
