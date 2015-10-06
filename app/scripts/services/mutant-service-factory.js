'use strict';

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
						skills: [],
						armors: [],
						powers: [],
						notes: [],
						weapons: [],
						items: [],
						money: angular.copy(ijob.startcapital)
					};
				staticStorage.skills.forEach(function (s) {
					if (s.natural || ijob.trainedSkills.indexOf(s.name) !== -1) {
						var newSkill = angular.copy(s);
						newSkill.valueSp = 0;
						newSkill.valueSpFree = 0;
						newSkill.valueErf = 0;
						newSkill.valueErfFree = 0;
						newChar.skills.push(newSkill);
					}
				});

				storage.activeCharacter = newChar;
				saveCharacter(newChar);
			}
		};
    }]);
