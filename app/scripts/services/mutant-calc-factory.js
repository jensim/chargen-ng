'use strict';

/**
 * @ngdoc service
 * @name chargenNgApp.mutantMongoServiceFactory
 * @description
 * # mutantMongoServiceFactory
 * Factory in the chargenNgApp.
 */

angular.module('chargenNgApp')
	.factory('mutantCalcFactory', ['mutantStaticdataFactory', function (mutantStaticdataFactory) {
		//var storage = $localStorage.mutant;
		var calcSecondarySkadeBonus = function () { //STY + STO
			var storage = mutantStaticdataFactory.getLocalStorage();

			var sum = storage.activeCharacter.attrPrim.STY.value + storage.activeCharacter.attrPrim.STO.value;
			var skadeBonus = '',
				key;
			for (key in storage.skadeBonus) {
				if (sum >= key) {
					skadeBonus = storage.skadeBonus[key];
				}
			}
			storage.activeCharacter.attrSec.sb.value = skadeBonus;
		};

		return {
			calcSecondaryAttribute: function (attr) {
				var storage = mutantStaticdataFactory.getLocalStorage();

				if (attr.name === storage.activeCharacter.attrSec.sb.name) {
					calcSecondarySkadeBonus();
				} else if (attr.name === storage.activeCharacter.attrSec.ib.name) {
					attr.value = storage.activeCharacter.attrPrim.SMI.value;
				} else if (attr.name === storage.activeCharacter.attrSec.bf.name) {
					attr.value = storage.activeCharacter.attrPrim.STY.value;
				} else if (attr.name === storage.activeCharacter.attrSec.rea.name) {
					attr.value = storage.activeCharacter.attrPrim.PER.value * 5;
				} else if (attr.name === storage.activeCharacter.attrSec.ryk.name) {
					attr.value = 0;
				} else if (attr.name === storage.activeCharacter.attrSec.sts.name) {
					attr.value = 0;
				} else if (attr.name === storage.activeCharacter.attrSec.ffstrid.name) {
					attr.value = Math.floor(storage.activeCharacter.attrPrim.SMI.value / 5);
				} else if (attr.name === storage.activeCharacter.attrSec.ffspring.name) {
					attr.value = Math.floor(storage.activeCharacter.attrPrim.SMI.value / 2);
				} else if (attr.name === storage.activeCharacter.attrSec.ffsprint.name) {
					attr.value = storage.activeCharacter.attrPrim.SMI.value;
				} else if (attr.name === storage.activeCharacter.attrSec.kp.name) {
					attr.value = storage.activeCharacter.attrPrim.FYS.value + storage.activeCharacter.attrPrim.STO.value;
				} else if (attr.name === storage.activeCharacter.attrSec.tt.name) {
					attr.value = Math.floor((storage.activeCharacter.attrPrim.FYS.value + storage.activeCharacter.attrPrim.STO.value) / 2);
				}
			},
			getSkillUsedErf: function (skill) {
				var sum = 0;
				if (skill.valueErf > 0) {
					var storage = mutantStaticdataFactory.getLocalStorage();

					var timesGE = skill.natural ? 1 : 0;
					timesGE += skill.valueSp + skill.valueSpFree;
					var attrPrim = storage.activeCharacter.attrPrim[skill.attrPrim];
					var fromGE = timesGE * (attrPrim.value + attrPrim.mod);
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
			},
			calcArmorBodypart: function (part) {
				var sum = 0;
				var storage = mutantStaticdataFactory.getLocalStorage();
				storage.activeCharacter.armors.forEach(function (a) {
					if (a.bodyPart === part && a.wearing) {
						sum += a.ABS;
					}
				});
				return sum;
			},
			calcArmorBeg: function (part) {
				var sum = 0;
				var storage = mutantStaticdataFactory.getLocalStorage();
				storage.activeCharacter.armors.forEach(function (a) {
					if (a.bodyPart === part && a.wearing) {
						sum += a.BEG;
					}
				});
				return sum;
			}
		};
    }]);
