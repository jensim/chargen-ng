'use strict';

/**
 * @ngdoc function
 * @name chargenNgApp.controller:MutantCtrl
 * @description
 * # MutantCtrl
 * Controller of the chargenNgApp
 */
var jsonLog = function (j) {
    console.log(JSON.stringify(j, null, '\t'));
};

angular.module('chargenNgApp')
    .controller('MutantCtrl', ['$scope', 'mutantMongoServiceFactory', '$localStorage', function ($scope, mutantMongoServiceFactory, $localStorage) {

        $scope.$storage = $localStorage;
        $scope.gameClasses = mutantMongoServiceFactory.getClasses();
        $scope.gameJobs = mutantMongoServiceFactory.getJobs();
        $scope.activeCharacter = $localStorage.activeCharacter;
        //$localStorage.characters = [];

        $scope.createCharacter = function () {
            if ($scope.create.klass && $scope.create.job) {
                $localStorage.activeCharacter = mutantMongoServiceFactory.newCharacter($scope.create.klass, $scope.create.job);
            }
        };
        $scope.saveCharacter = function () {
            mutantMongoServiceFactory.saveCharacter($localStorage.activeCharacter);
        };
        $scope.loadCharacter = function (character) {
            $localStorage.activeCharacter = character;
            $scope.create = undefined;
        };
        $scope.deleteCharacter = function (character) {
            mutantMongoServiceFactory.deleteCharacter(character);
        };
        $scope.skillSum = function (skill) {
            var timesGE = skill.natural ? 1 : 0;
            timesGE += skill.valueSp + skill.valueSpFree;
            var fromGE = timesGE * (skill.attrPrim.value + skill.attrPrim.mod);
            var fromTrain = skill.valueErf + skill.valueErfFree;
            return fromGE + fromTrain;
        };
        $scope.getUsedGE = function () {
            var sum = 0;
            if ($localStorage.activeCharacter) {
                var attr;
                for (attr in $localStorage.activeCharacter.attrPrim) {
                    sum += $localStorage.activeCharacter.attrPrim[attr].value
                }
            }
            return sum;

        };
        $scope.getUsedSP = function () {
            var sum = 0;
            if ($localStorage.activeCharacter) {
                var skill;
                for (skill in $localStorage.activeCharacter.skills) {
                    sum += $localStorage.activeCharacter.skills[skill].valueSp;
                }
                //TODO:calculate from powers
            }
            return sum;
        };
        $scope.getUsedErf = function () {
            var sum = 0;
            if ($localStorage.activeCharacter) {
                var skill;
                for (skill in $scope.activeCharacter.skills) {
                    sum += $scope.getSkillUsedErf($localStorage.activeCharacter.skills[skill]);
                }
            }
            return sum;
        };
        $scope.getSkillUsedErf = function (skill) {
            var sum = 0;
            if (skill.valueErf > 0) {
                var timesGE = skill.natural ? 1 : 0;
                timesGE += skill.valueSp + skill.valueSpFree;
                var fromGE = timesGE * (skill.attrPrim.value + skill.attrPrim.mod);
                var fromTrain = skill.valueErf;
                var total = fromGE + fromTrain;
                if (total < 85) {
                    sum += skill.valueErf;
                } else if (total > 100) {
                    if (fromGE < 85) {
                        sum += (85 - fromGE);
                        sum += ((100 - 85) * 2);
                        sum += ((total - 100) * 3);
                    } else if (fromGE > 100) {
                        sum += ((total - fromGE) * 3);
                    } else { //GE between..
                        sum += ((100 - fromGE) * 2);
                        sum += ((total - 100) * 3);
                    }
                } else { //between
                    if (fromGE < 85) {
                        sum += (85 - fromGE);
                        sum += ((total - 85) * 2);
                    } else {
                        sum += ((total - fromGE) * 2);
                    }
                }
            }
            return sum;
        };
    }]);
