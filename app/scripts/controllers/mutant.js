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
			if ($scope.create.char.klass && $scope.create.char.job) {
				mutantService.newCharacter($scope.create.char.klass, $scope.create.char.job);
			}
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
			var newWep = angular.copy($scope.create.weapon);
			if (!storage.activeCharacter.weapons && $scope.create.weapon) {
				storage.activeCharacter.weapons = [newWep];
			} else if (!$scope.weaponEdit && $scope.create && $scope.create.weapon) {
				storage.activeCharacter.weapons.push(newWep);
			}
			$scope.weaponEdit = newWep;
			$scope.create.weapon = newWep;
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
				var power;
				for (power in storage.activeCharacter.powers) {
					sum += storage.activeCharacter.powers[power].cost;
				}
			}
			return sum;
		};
		$scope.getUsedErf = function () {
			var sum = 0;
			if (storage.activeCharacter) {
				storage.activeCharacter.skills.forEach(function (skill, index, skills) {
					sum += $scope.getSkillUsedErf(skills[index]);
				});
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
			storage.activeCharacter.skills.forEach(function (s, index) {
				if (storage.activeCharacter.skills[index] === skill) {
					storage.activeCharacter.skills.splice(index, 1);
				}
			});
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
		$scope.editPower = function (power) {
			$scope.setCreationPower(power);
			$scope.powerEdit = power;
		};
		$scope.createPower = function () {
			var newPower = angular.copy($scope.create.power);
			storage.activeCharacter.powers.push(newPower);
			if (newPower.skill) {
				storage.activeCharacter.skills.push(angular.copy(newPower.skill));
			}
			$scope.setCreationPower(newPower);
			$scope.powerEdit = newPower;
		};
		$scope.deletePower = function (power) {
			mutantService.deletePower(power);
			$scope.setCreationPower();
			$scope.powerEdit = undefined;
		};
		$scope.availablePowers = function () {
			if (storage.activeCharacter) {
				return flatData.powers[storage.activeCharacter.klass.short];
			} else {
				return {};
			}
		};
		$scope.calcArmor = function (part) {
			if (storage.activeCharacter === undefined) {
				return 0;
			}
			if (part === undefined) {
				throw 'calcArmor:: no part defined';
			}
			return mutantCalcFactory.calcArmorBodypart(part);
		};
		$scope.calcBeg = function () {
			if (storage.activeCharacter === undefined) {
				return 0;
			}
			return mutantCalcFactory.calcArmorBeg();
		};
		$scope.createArmor = function () {
			var newArmor = angular.copy($scope.create.armor);
			storage.activeCharacter.armors.push(newArmor);
		};
		$scope.deleteArmor = function (armor) {
			mutantService.deleteArmor(armor);
			$scope.armorEdit = undefined;
			if ($scope.create.armor) {
				delete $scope.create.armor;
			}
		};
		$scope.editArmor = function (armor) {
			$scope.armorEdit = armor;
		};
		$scope.createNote = function () {
			var newNote = {
				head: 'Ny',
				content: ''
			};
			$scope.noteEdit = newNote;
			storage.activeCharacter.notes.push(newNote);
		};
		$scope.editNote = function (note) {
			$scope.noteEdit = note;
		};
		$scope.deleteNote = function (noteIndex) {
			if (storage.activeCharacter.notes.splice(noteIndex, 1)[0] === $scope.noteEdit) {
				$scope.noteEdit = undefined;
			}
		};
		$scope.createItem = function () {
			var newItem = angular.copy($scope.create.item);
			storage.activeCharacter.items.push(newItem);
			$scope.armorEdit = newItem;
		};
		$scope.deleteItem = function (itemIndex) {
			//throw 'not yet implmented';
			if (storage.activeCharacter.items.splice(itemIndex, 1)[0] === $scope.itemEdit) {
				$scope.itemEdit = undefined;
			}
		};
		$scope.moneyManage = function (mod) {
			storage.activeCharacter.money += mod;
		};
    }]);
