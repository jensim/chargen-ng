'use strict';

/**
 * @ngdoc service
 * @name chargenNgApp.mutantMongoServiceFactory
 * @description
 * # mutantMongoServiceFactory
 * Factory in the chargenNgApp.
 */

angular.module('chargenNgApp')
	.factory('mutantServiceFactory', ['mutantStaticdataFactory', function (mutantStaticdataFactory) {

		var saveCharacter = function (inChar) {
			var storage = mutantStaticdataFactory.getLocalStorage();
			//character = angular.copy(inChar);

			if (inChar) {
				if (storage.characters === undefined) {
					storage.characters = [inChar];
					return;
				} else if (storage.characters.indexOf(inChar) === -1) {
					storage.characters.push(inChar);
				} else {
					console.error('Didn\'t save.');
				}
			}
		};

		return {
			newCharacter: function (iklass, ijob) {
				var staticStorage = mutantStaticdataFactory.getStaticStorage(),
					storage = mutantStaticdataFactory.getLocalStorage(),

					newChar = {
						name: 'Ny',
						klass: angular.copy(iklass),
						job: angular.copy(ijob),
						attrPrim: angular.copy(staticStorage.attrPrim),
						attrSec: angular.copy(staticStorage.attrSec),
						skills: angular.copy(ijob.trainedSkills),
						armors: [],
						powers: [],
						notes: [],
						weapons: []
					},
					skill;
				for (skill in staticStorage.skills) {
					if (staticStorage.skills[skill].natural) {
						newChar.skills.push(angular.copy(staticStorage.skills[skill]));
					}
				}
				storage.activeCharacter = newChar;
				saveCharacter(newChar);
			},
			saveCharacter: function (character) {
				saveCharacter(character);
			},
			deleteCharacter: function (character) {
				var storage = mutantStaticdataFactory.getLocalStorage();
				storage.characters.forEach(function (c, i, characters) {
					if (character === c) {
						characters.splice(i, 1);
					}
				});
				if (storage.activeCharacter === character) {
					storage.activeCharacter = undefined;
				}
			},
			deletePower: function (power) {
				var storage = mutantStaticdataFactory.getLocalStorage();
				storage.activeCharacter.powers.forEach(function (p, i, powers) {
					if (p === power) {
						if (p.skill !== undefined) {
							storage.activeCharacter.skills.forEach(function (s, j, skills) {
								if (p.skill.name === s.name) {
									skills.splice(j, 1);
								}
							});
						}
						powers.splice(i, 1);
					}
				});
			},
			deleteArmor: function (armor) {
				var storage = mutantStaticdataFactory.getLocalStorage();
				storage.activeCharacter.armors.forEach(function (a, i, arr) {
					if (a === armor) {
						arr.splice(i, 1);
					}
				});
			}
		};
    }]);
