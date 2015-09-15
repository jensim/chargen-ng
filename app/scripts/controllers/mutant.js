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
                console.log('Push 1');
            } else if (!$scope.weaponEdit && $scope.create && $scope.create.weapon) {
                $localStorage.activeCharacter.weapons.push($scope.create.weapon);
                $scope.weaponEdit = $scope.create.weapon;
                console.log('Push 2');
            }
        };
        $scope.deleteWeapon = function () {
            if (!$scope.weaponEdit || !$localStorage.activeCharacter.weapons) {
                return;
            }
            //            delete $localStorage.activeCharacter.weapons[$scope.weaponEdit];
            var i;
            for (i = 0; i < $localStorage.activeCharacter.weapons.length; ++i) {
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
        $scope.random = function (max, min) {
            if (max !== undefined && min !== undefined) {
                return Math.floor((Math.random() * max) + min);
            } else {
                return -1;
            }
        };
        $scope.randomDice = function (dice) {
            if (dice === undefined) {
                return '';
            } else {
                jsonLog(dice);
                var sum = 0;

                var i;
                for (i = 0; i < dice.num; ++i) {
                    var diceRoll = $scope.random(dice.die, 1);
                    console.log('diceRoll:' + diceRoll);
                    sum += diceRoll;
                }
                if (dice.static) {
                    sum += dice.static;
                }

                return sum;
            }
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
                for (skill in $localStorage.activeCharacter.skills) {
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
