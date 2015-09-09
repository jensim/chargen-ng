'use strict';

/**
 * @ngdoc function
 * @name chargenNgApp.controller:MutantCtrl
 * @description
 * # MutantCtrl
 * Controller of the chargenNgApp
 */
angular.module('chargenNgApp')
    .controller('MutantCtrl', ['$scope', 'mutantMongoServiceFactory', function ($scope, mutantMongoServiceFactory) {

        $scope.gameCharacters = mutantMongoServiceFactory.getCharacters();
        $scope.gameClasses = mutantMongoServiceFactory.getClasses();
        $scope.gameJobs = mutantMongoServiceFactory.getJobs();

        $scope.createCharacter = function () {
            console.log('not yet implemented');
        };
        $scope.loadCharacter = function (character) {
            $scope.activeCharacter = character;
            $scope.create = undefined;
        };
    }]);
