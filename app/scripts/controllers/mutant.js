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
    .controller('MutantCtrl', ['$scope', 'mutantMongoServiceFactory', function ($scope, mutantMongoServiceFactory) {

        $scope.gameCharacters = mutantMongoServiceFactory.getCharacters();
        $scope.gameClasses = mutantMongoServiceFactory.getClasses();
        $scope.gameJobs = mutantMongoServiceFactory.getJobs();

        $scope.createCharacter = function () {
            console.log('not yet implemented');
        };
        $scope.loadCharacter = function (character) {
            //jsonLog(character);
            $scope.activeCharacter = character;
            $scope.create = undefined;
        };
        $scope.skillSum = function (skill) {
            var timesGE = skill.natural ? 1 : 0;
            timesGE += skill.valueSp + skill.valueSpFree;
            var fromGE = timesGE * (skill.attrPrim.value + skill.attrPrim.mod);
            var fromTrain = skill.valueErf + skill.valueErfFree;
            console.log(skill.name + ' skillsum: ' + fromGE + fromTrain);
            return fromGE + fromTrain;
        };
        $scope.getUsedSP = function () {
            var sum = 0;
            for (skill in $scope.activeCharacter.skills) {
                sum += $scope.activeCharacter.skills[skill].valueSp;
            }
            //TODO:calculate from powers
            console.error('getUsedSP is not calculating SP from abilities');
            return sum;
        };
        $scope.getUsedErf = function () {
            var sum = 0;
            for (skill in $scope.activeCharacter.skills) {
                sum += $scope.getSkillUsedErf($scope.activeCharacter.skills(skill));
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
