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
                minPrimAttr: 5,
                maxPrimAttr: 20,
                description: 'Upper crust'
            },
            mm: {
                name: 'Muterad människa',
                sp: 84,
                minPrimAttr: 3,
                maxPrimAttr: 18,
                description: 'Löskefolket'
            },
            psi: {
                name: 'Psi-mutant',
                sp: 84,
                minPrimAttr: 3,
                maxPrimAttr: 18,
                description: 'Farliga'
            },
            rbt: {
                name: 'Robot',
                sp: 84,
                minPrimAttr: 3,
                maxPrimAttr: 18,
                description: 'Tjänaren och underverket'
            }
        };

        var jobs = {
            bonde: {
                name: 'Bonde',
                description: 'jobba m jord o lort'
            }
        };
        var attrPrim = {
            STY: {
                name: 'Styrka',
                short: 'STY',
                description: '',
                value: 5,
                mod: 0
            },
            FYS: {
                name: 'Fysik',
                short: 'FYS',
                description: '',
                value: 5,
                mod: 0
            },
            STO: {
                name: 'Storlek',
                short: 'STO',
                description: '',
                value: 5,
                mod: 0
            },
            SMI: {
                name: 'Smidighet',
                short: 'SMI',
                description: '',
                value: 5,
                mod: 0
            },
            INT: {
                name: 'Intelligens',
                short: 'INT',
                description: '',
                value: 5,
                mod: 0
            },
            VIL: {
                name: 'Vilja',
                short: 'VIL',
                description: '',
                value: 5,
                mod: 0
            },
            PER: {
                name: 'Personlighet',
                short: 'PER',
                description: '',
                value: 5,
                mod: 0
            }
        };
        var templateChars = [{
            name: 'one',
            klass: klasses.imm,
            job: jobs.bonde,
            attrPrim
                }];

        // Public API here
        return {
            getCharacters: function () {
                return templateChars;
            },
            getClasses: function () {
                return klasses;
            },
            getJobs: function () {
                return jobs;
            }
        };
    }]);
