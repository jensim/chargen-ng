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
    .controller('MutantCtrl', ['$scope', 'mutantMongoServiceFactory', '$localStorage', 'mutantCalcFactory', function ($scope, mutantMongoServiceFactory, $localStorage, mutantCalcFactory) {

        $scope.$storage = $localStorage;

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
        $scope.editWeapon = function (weapon) {
            if (!$scope.create) {
                $scope.create = {
                    weapon: weapon
                };
            } else {
                $scope.create.weapon = weapon;
            }
            $scope.weaponEdit = weapon;
        };
        $scope.saveWeapon = function () {
            if (!$localStorage.activeCharacter.weapons && $scope.create.weapon) {
                $localStorage.activeCharacter.weapons = [$scope.create.weapon];
                //jsonLog($localStorage.activeCharacter.weapons);
                //console.log('Push 1');
            } else if (!$scope.weaponEdit && $scope.create && $scope.create.weapon) {
                $localStorage.activeCharacter.weapons.push($scope.create.weapon);
                $scope.weaponEdit = $scope.create.weapon;
                //console.log('Push 2');
            }
        };
        $scope.deleteWeapon = function () {
            if (!$scope.weaponEdit || !$localStorage.activeCharacter.weapons) {
                return;
            }
            var i;
            for (i = 0; i < $localStorage.activeCharacter.weapons.length; i += 1) {
                var weapon = $localStorage.activeCharacter.weapons[i];
                if ($scope.weaponEdit === weapon) {
                    $localStorage.activeCharacter.weapons.splice(i, 1);
                }
            }
            $scope.weaponEdit = undefined;
            $scope.create = {
                weapon: undefined
            };
        };
        $scope.calcSecAttr = function (attr) {
            if (attr === undefined) {
                for (attr in $localStorage.activeCharacter.attrSec) {
                    mutantCalcFactory.calcSecondaryAttribute($localStorage.activeCharacter.attrSec[attr]);
                }
            } else {
                mutantCalcFactory.calcSecondaryAttribute(attr);
            }
        };
        var calcSecAttr = function (attr) {
            console.log('Calulating: ' + attr.name);

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
                    sum += $localStorage.activeCharacter.attrPrim[attr].value;
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
                for (skill in $localStorage.activeCharacter.skills) {
                    sum += $scope.getSkillUsedErf($localStorage.activeCharacter.skills[skill]);
                }
            }
            return sum;
        };
        $scope.getSkillUsedErf = function (skill) {
            return mutantCalcFactory.getSkillUsedErf(skill);
        };
    }]);
