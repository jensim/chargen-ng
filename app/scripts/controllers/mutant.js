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
		var storage = $scope.storage;
		var flatData = $scope.flatData;

		storage.activeCharacter = storage.characters ? storage.characters[0] : undefined;

		/* * * * * * * * * * * */

		$scope.createCharacter = function () {
			if ($scope.create.char.klass && $scope.create.char.job) {
				mutantService.newCharacter($scope.create.char.klass, $scope.create.char.job);
			}
		};
		$scope.loadCharacter = function (character) {
			storage.activeCharacter = character;
		};
		$scope.deleteCharacter = function (charIndex) {
			if (storage.characters.splice(charIndex, 1)[0] === storage.activeCharacter) {
				storage.activeCharacter = undefined;
			}
		};
		$scope.editWeapon = function (weapon) {
			if ($scope.weaponEdit === weapon) {
				$scope.weaponEdit = undefined;
			} else {
				$scope.weaponEdit = weapon;
			}
		};
		$scope.createWeapon = function () {
			var newWep = angular.copy($scope.create.weapon);
			storage.activeCharacter.weapons.push(newWep);
			$scope.weaponEdit = newWep;
		};
		$scope.deleteWeapon = function (weaponIndex) {
			if (storage.activeCharacter.weapons.splice(weaponIndex, 1)[0] === $scope.weaponEdit) {
				$scope.weaponEdit = undefined;
			}
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
			var timesGE = skill.natural ? 1 : skill.postTrained ? 1 : 0;
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
		$scope.createSkill = function () {
			var newSkill = angular.copy($scope.create.skill);
			newSkill.postTrained = 14 - storage.activeCharacter.attrPrim['INT'].value;
			if (newSkill.postTrained < 2) {
				newSkill.postTrained = 2;
			}
			storage.activeCharacter.skills.push(newSkill);
			$scope.create.skill = {};
		};
		$scope.deleteSkill = function (skillIndex) {
			storage.activeCharacter.skills.splice(skillIndex, 1);
			$scope.skillEdit = undefined;
		};
		$scope.editSkill = function (skill) {
			if (skill === $scope.skillEdit) {
				$scope.skillEdit = undefined;
			} else {
				$scope.skillEdit = skill;
			}
		};
		$scope.editPower = function (power) {
			if ($scope.powerEdit === power) {
				$scope.powerEdit = undefined;
			} else {
				$scope.powerEdit = power;
			}
		};
		$scope.createPower = function () {
			var newPower = angular.copy($scope.create.power);
			storage.activeCharacter.powers.push(newPower);
			if (newPower.skill) {
				storage.activeCharacter.skills.push(angular.copy(newPower.skill));
			}
			$scope.powerEdit = newPower;
		};
		$scope.deletePower = function (powerIndex) {
			if (storage.activeCharacter.powers.splice(powerIndex, 1)[0] === $scope.powerEdit) {
				$scope.powerEdit = undefined;
			}
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
		$scope.deleteArmor = function (armorIndex) {
			if (storage.activeCharacter.armors.splice(armorIndex, 1)[0] === $scope.armorEdit) {
				$scope.armorEdit = undefined;
			}
		};
		$scope.editArmor = function (armor) {
			if (armor === $scope.armorEdit) {
				$scope.armorEdit = undefined;
			} else {
				$scope.armorEdit = armor;
			}
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
			if (note === $scope.noteEdit) {
				$scope.noteEdit = undefined;
			} else {
				$scope.noteEdit = note;
			}
		};
		$scope.deleteNote = function (noteIndex) {
			if (storage.activeCharacter.notes.splice(noteIndex, 1)[0] === $scope.noteEdit) {
				$scope.noteEdit = undefined;
			}
		};
		$scope.createItem = function () {
			if ($scope.create && $scope.create.item) {
				var newItem = angular.copy($scope.create.item);
				storage.activeCharacter.items.push(newItem);
				$scope.itemEdit = newItem;
			} else {
				var newItem = {
					name: 'Nytt föremål',
					description: '',
					quantity: 1,
					cost: 0
				};
				storage.activeCharacter.items.push(newItem);
				$scope.itemEdit = newItem;
			}
		};
		$scope.editItem = function (item) {
			if ($scope.itemEdit === item) {
				$scope.itemEdit = undefined;
			} else {
				$scope.itemEdit = item;
			}
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
