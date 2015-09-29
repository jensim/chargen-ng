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
						skills: angular.copy(ijob.trainedSkills),
						armors: [],
						powers: [],
						notes: [],
						weapons: [],
						items: [],
						money: angular.copy(ijob.startcapital)
					},
					skill;
				for (skill in staticStorage.skills) {
					if (staticStorage.skills[skill].natural) {
						newChar.skills.push(angular.copy(staticStorage.skills[skill]));
					}
				}
				storage.activeCharacter = newChar;
				saveCharacter(newChar);
			}
		};
    }]);
