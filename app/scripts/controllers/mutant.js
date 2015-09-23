'use strict';

/**
 * @ngdoc function
 * @name chargenNgApp.controller:MutantCtrl
 * @description
 * # MutantCtrl
 * Controller of the chargenNgApp
 */
angular.module('chargenNgApp')
	.controller('MutantCtrl', ['$scope', 'mutantServiceFactory', 'mutantStaticdataFactory', 'mutantCalcFactory', function ($scope, mutantService, mutantStaticdataFactory, mutantCalcFactory) {

		var jsonLog = function (j) {
			console.log(JSON.stringify(j, null, '\t'));
		};

		$scope.logIt = function (msg) {
			jsonLog(msg);
		};

		$scope.storage = mutantStaticdataFactory.getLocalStorage();
		$scope.flatData = mutantStaticdataFactory.getStaticStorage();
		var storage = mutantStaticdataFactory.getLocalStorage(),
			flatData = mutantStaticdataFactory.getStaticStorage();

		$scope.createCharacter = function () {
			if ($scope.create.klass && $scope.create.job) {
				mutantService.newCharacter($scope.create.klass, $scope.create.job);
			}
		};
		$scope.saveCharacter = function () {
			mutantService.saveCharacter(storage.activeCharacter);
		};
		$scope.loadCharacter = function (character) {
			storage.activeCharacter = character;
			$scope.create = undefined;
		};
		$scope.deleteCharacter = function (character) {
			mutantService.deleteCharacter(character);
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
			if (!storage.activeCharacter.weapons && $scope.create.weapon) {
				storage.activeCharacter.weapons = [$scope.create.weapon];
			} else if (!$scope.weaponEdit && $scope.create && $scope.create.weapon) {
				storage.activeCharacter.weapons.push($scope.create.weapon);
			}
			$scope.weaponEdit = $scope.create.weapon;
		};
		$scope.deleteWeapon = function () {
			if (!$scope.weaponEdit || !storage.activeCharacter.weapons) {
				return;
			}
			var i;
			for (i = 0; i < storage.activeCharacter.weapons.length; i += 1) {
				var weapon = storage.activeCharacter.weapons[i];
				if ($scope.weaponEdit === weapon) {
					storage.activeCharacter.weapons.splice(i, 1);
				}
			}
			$scope.weaponEdit = undefined;
			$scope.create = {
				weapon: undefined
			};
		};
		$scope.calcSecAttr = function (attr) {
			if (attr === undefined) {
				for (attr in storage.activeCharacter.attrSec) {
					mutantCalcFactory.calcSecondaryAttribute(storage.activeCharacter.attrSec[attr]);
				}
			} else {
				mutantCalcFactory.calcSecondaryAttribute(attr);
			}
		};
		$scope.skillSum = function (skill) {
			var timesGE = skill.natural ? 1 : 0;
			timesGE += skill.valueSp + skill.valueSpFree;
			var fromGE = timesGE * (
				storage.activeCharacter.attrPrim[skill.attrPrim].value +
				storage.activeCharacter.attrPrim[skill.attrPrim].mod);
			var fromTrain = skill.valueErf + skill.valueErfFree;
			return fromGE + fromTrain;
		};
		$scope.getUsedGE = function () {
			var sum = 0;
			if (storage.activeCharacter) {
				var attr;
				for (attr in storage.activeCharacter.attrPrim) {
					sum += storage.activeCharacter.attrPrim[attr].value;
				}
			}
			return sum;

		};
		$scope.getUsedSP = function () {
			var sum = 0;
			if (storage.activeCharacter) {
				var skill;
				for (skill in storage.activeCharacter.skills) {
					sum += storage.activeCharacter.skills[skill].valueSp;
				}
				//TODO:calculate from powers
			}
			return sum;
		};
		$scope.getUsedErf = function () {
			var sum = 0;
			if (storage.activeCharacter) {
				var skill;
				for (skill in storage.activeCharacter.skills) {
					sum += $scope.getSkillUsedErf(storage.activeCharacter.skills[skill]);
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
			storage.activeCharacter.skills.push(angular.copy($scope.create.skill));
			$scope.setCreationSkill();
		};
		$scope.deleteSkill = function (skill) {
			var s;
			for (s in storage.activeCharacter.skills) {
				if (storage.activeCharacter.skills[s] === skill) {
					storage.activeCharacter.skills.splice(s, 1);
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
			if (storage.activeCharacter.powers === undefined) {
				storage.activeCharacter.powers = [];
			}
			storage.activeCharacter.powers.push(angular.copy($scope.create.power));
			if ($scope.create.power.skill) {
				storage.activeCharacter.skills.push(angular.copy($scope.create.power.skill));
			}
			$scope.setCreationPower();
		};
		$scope.deletePower = function (power) {
			mutantService.deletePower(power);
		};
		$scope.availablePowers = function () {
			if (storage.activeCharacter) {
				return flatData.powers[storage.activeCharacter.klass.short];
			} else {
				return {};
			}
		};
    }]);
