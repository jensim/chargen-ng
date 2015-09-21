'use strict';

/**
 * @ngdoc function
 * @name chargenNgApp.controller:MutantCtrl
 * @description
 * # MutantCtrl
 * Controller of the chargenNgApp
 */
angular.module('chargenNgApp')
	.controller('MutantCtrl', ['$scope', 'mutantMongoServiceFactory', '$localStorage', 'mutantCalcFactory', function ($scope, mutantMongoServiceFactory, $localStorage, mutantCalcFactory) {

		var jsonLog = function (j) {
				console.log(JSON.stringify(j, null, '\t'));
			},
			calcSecAttr = function (attr) {
				console.log('Calulating: ' + attr.name);

			};

		$scope.logIt = function (msg) {
			jsonLog(msg);
		};
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
			} else if (!$scope.weaponEdit && $scope.create && $scope.create.weapon) {
				$localStorage.activeCharacter.weapons.push($scope.create.weapon);
				$scope.weaponEdit = $scope.create.weapon;
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
		$scope.skillSum = function (skill) {
			var timesGE = skill.natural ? 1 : 0;
			timesGE += skill.valueSp + skill.valueSpFree;
			var fromGE = timesGE * (
				$localStorage.activeCharacter.attrPrim[skill.attrPrim].value +
				$localStorage.activeCharacter.attrPrim[skill.attrPrim].mod);
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
		$scope.setCreationSkill = function (skill) {
			if (skill) {
				skill.postTrained = true;
			} else {
				skill = {
					postTrained: true
				};
			}
			if ($scope.create) {
				$scope.create.skill = skill;
			} else {
				$scope.create = {
					skill: skill
				};
			}
		};
		$scope.createSkill = function () {
			$localStorage.activeCharacter.skills.push(angular.copy($scope.create.skill));
			$scope.setCreationSkill();
		};
		$scope.deleteSkill = function (skill) {
			var s;
			for (s in $localStorage.activeCharacter.skills) {
				if ($localStorage.activeCharacter.skills[s] === skill) {
					$localStorage.activeCharacter.skills.splice(s, 1);
					break;
				}
			}
		};
		$scope.setCreationPower = function (power) {
			jsonLog(power);
			if ($scope.create) {
				$scope.create.power = power;
			} else {
				$scope.create = {
					power: power
				};
			}
		};
		$scope.createPower = function () {
			if ($localStorage.activeCharacter.powers === undefined) {
				$localStorage.activeCharacter.powers = [];
			}
			$localStorage.activeCharacter.powers.push(angular.copy($scope.create.power));
			if ($scope.create.power.skill) {
				$localStorage.activeCharacter.skills.push(angular.copy($scope.create.power.skill));
			}
			$scope.setCreationPower();
		};
		$scope.deletePower = function (power) {
			mutantMongoServiceFactory.deletePower(power);
		};
		$scope.availablePowers = function () {
			if ($localStorage.activeCharacter) {
				return $localStorage.powers[$localStorage.activeCharacter.klass.short];
			} else {
				return {};
			}
		};
    }]);
