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
			var storage = mutantStaticdataFactory.getLocalStorage(),
				character = angular.copy(inChar);

			if (character) {
				if (storage.characters === undefined) {
					storage.characters = [character];
					return;
				}
				var existsIndex = -1,
					i;
				for (i = 0; i < storage.characters.length; i += 1) {
					if (storage.characters[i].name === character.name) {
						existsIndex = i;
					}
				}
				if (existsIndex >= 0) {
					storage.characters[existsIndex] = character;
				} else {
					storage.characters.push(character);
				}
			}
		};

		return {
			newCharacter: function (iklass, ijob) {
				var staticStorage = mutantStaticdataFactory.getStaticStorage(),
					storage = mutantStaticdataFactory.getLocalStorage(),

					newChar = {
						name: 'ny',
						klass: angular.copy(iklass),
						job: angular.copy(ijob),
						attrPrim: angular.copy(staticStorage.attrPrim),
						attrSec: angular.copy(staticStorage.attrSec),
						skills: angular.copy(ijob.trainedSkills),
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
				var i;
				for (i = 0; i < storage.characters.length; i += 1) {
					if (storage.characters[i].name === character.name) {
						storage.characters.splice(i, 1);
						return;
					}
				}
			},
			deletePower: function (power) {
				var storage = mutantStaticdataFactory.getLocalStorage();

				var p;
				for (p in storage.activeCharacter.powers) {
					if (storage.activeCharacter.powers[p] === power) {
						if (storage.activeCharacter.powers[p].skill !== undefined) {
							var s;
							for (s in storage.activeCharacter.skills) {
								if (storage.activeCharacter.skills[s].name === storage.activeCharacter.powers[p].skill.name) {
									storage.activeCharacter.skills.splice(s, 1);
								}
							}
						}
						storage.activeCharacter.powers.splice(p, 1);
						break;
					}
				}
			},
			loadCharacters: function () {
				var storage = mutantStaticdataFactory.getLocalStorage();

				if (storage.characters) {
					return storage.characters;
				} else {
					return {};
				}
			}
		};
    }]);
