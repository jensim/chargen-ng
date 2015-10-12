'use strict';

angular.module('chargenNgApp')
	.factory('mutantStaticdataFactory', ['$localStorage', '$log', 'Tabletop', function ($localStorage, $log, Tabletop) {
		var version = '0.2';
		var dataLoaded = false;
		var attrPrimShort = [
			{
				name: 'STY'
			},
			{
				name: 'FYS'
			},
			{
				name: 'STO'
			},
			{
				name: 'SMI'
			},
			{
				name: 'INT'
			},
			{
				name: 'VIL'
			},
			{
				name: 'PER'
			}
		];
		var attrPrim = {
			STY: {
				name: 'Styrka',
				short: 'STY',
				description: '',
				value: 5,
				trained: 0,
				mod: 0
			},
			FYS: {
				name: 'Fysik',
				short: 'FYS',
				description: '',
				value: 5,
				trained: 0,
				mod: 0
			},
			STO: {
				name: 'Storlek',
				short: 'STO',
				description: '',
				value: 5,
				trained: 0,
				mod: 0
			},
			SMI: {
				name: 'Smidighet',
				short: 'SMI',
				description: '',
				value: 5,
				trained: 0,
				mod: 0
			},
			INT: {
				name: 'Intelligens',
				short: 'INT',
				description: '',
				value: 5,
				trained: 0,
				mod: 0
			},
			VIL: {
				name: 'Vilja',
				short: 'VIL',
				description: '',
				value: 5,
				trained: 0,
				mod: 0
			},
			PER: {
				name: 'Personlighet',
				short: 'PER',
				description: '',
				value: 5,
				trained: 0,
				mod: 0
			}
		};
		var skadeBonus = {
			0: '-2D4',
			7: '-1D6',
			11: '-1D4',
			15: '-1D3',
			17: '-1D2',
			19: '-1',
			21: '',
			24: '+1',
			26: '1D2',
			28: '1D3',
			30: '1D4',
			34: '1D6',
			38: '2D4',
			46: '2D6',
			58: '3D6',
			70: '4D6',
			82: '5D6'
		};
		var attrSec = {
			sb: {
				name: 'SKADEBONUS (SB)',
				description: 'Enl tabell',
				value: 0
			},
			ib: {
				name: 'INITIATIVBONUS (IB)',
				description: 'SMI',
				value: 0
			},
			bf: {
				name: 'BÄRFÖRMÅGA (BF)',
				description: 'STY. Men varje kilo över detta ger 1% straff på SMI-baserade färdigheter.',
				value: 0
			},
			rea: {
				name: 'REAKTIONSVÄRDE (REA)',
				description: 'PER %',
				value: 0
			},
			ryk: {
				name: 'RYKTE',
				description: 'Kan förtjänas, IMM kan välja.',
				value: 0
			},
			sts: {
				name: 'STATUS',
				description: 'Kan förtjänas, IMM kan välja.',
				value: 0
			},
			ffstrid: {
				name: 'FF – STRID',
				description: 'SMI / 5 avrundat nedåt',
				value: 0
			},
			ffspring: {
				name: 'FF – SPRINGA',
				description: 'SMI / 2 avrundat nedåt',
				value: 0
			},
			ffsprint: {
				name: 'FF – SPRINT',
				description: 'SMI avrundat nedåt',
				value: 0
			},
			kp: {
				name: 'KROPPSPOÄNG (KP)',
				description: 'STO + FYS',
				value: 0
			},
			tt: {
				name: 'TRAUMATRÖSKEL (TT)',
				description: '(STO + FYS) / 2',
				value: 0
			}
		};
		var weaponReach = {
			melee: {
				name: 'Närstrid',
				aproxDist: '5 m',
				exWeapon: 'Närstrid'
			},
			close: {
				name: 'Nära',
				aproxDist: '10 m',
				exWeapon: 'Pistol'
			},
			short: {
				name: 'Kort',
				aproxDist: '25 m',
				exWeapon: 'Hagelgevär'
			},
			medium: {
				name: 'Menium',
				aproxDist: '50 m',
				exWeapon: 'K-pist'
			},
			far: {
				name: 'Långt',
				aproxDist: '100 m',
				exWeapon: 'Automatgevär'
			},
			veryFar: {
				name: 'Mycket långt',
				aproxDist: '200 m',
				exWeapon: 'Jaktgevär'
			},
			extremlyFar: {
				name: 'Extremt långt',
				aproxDist: '400 m',
				exWeapon: 'Prickskyttevapen'
			}
		};
		var bodyParts = {
			1: 'Höger ben',
			2: 'Vänster ben',
			3: 'Bål',
			4: 'Höger arm',
			5: 'Vänster arm',
			6: 'Huvudet',
			7: 'Extra kroppsdel 1',
			8: 'Extra kroppsdel 2',
			9: 'Extra kroppsdel 3',
			10: 'Extra kroppsdel 4',
			11: 'Extra kroppsdel 5',
			12: 'Extra kroppsdel 6',
			13: 'Extra kroppsdel 7',
			14: 'Extra kroppsdel 8',
			15: 'Extra kroppsdel 9',
			16: 'Extra kroppsdel 10',
		};
		var staticData = {
			version: version,
			klasses: {},
			attrPrimShort: attrPrimShort,
			attrPrim: attrPrim,
			skills: {},
			jobs: {},
			skadeBonus: skadeBonus,
			attrSec: attrSec,
			powers: {},
			weaponReach: weaponReach,
			weapons: {},
			bodyParts: bodyParts,
			armors: {},
			shields: [],
			gear: {}
		};
		var gSheets = [
			{
				key: 'klasser',
				place: 'klasses'
				}, {
				key: 'imm_talang',
				place: 'powers',
				subPlace: 'imm'
				}, {
				key: 'psi_mutation',
				place: 'powers',
				subPlace: 'psi'
				}, {
				key: 'rbt_option',
				place: 'powers',
				subPlace: 'rbt'
				}, {
				key: 'mm_mutation',
				place: 'powers',
				subPlace: 'mm'
				}, {
				key: 'weapons_regClose',
				name: 'Vanliga närstridsvapen',
				place: 'weapons',
				subPlace: 'regClose',
				subSubPlace: 'weapons'
				}, {
				key: 'weapons_techClose',
				name: 'Högteknologiska närstridsvapen',
				place: 'weapons',
				subPlace: 'techClose',
				subSubPlace: 'weapons'
				}, {
				key: 'weapons_regMissile',
				name: 'Vanliga kast- och projektilvapen',
				place: 'weapons',
				subPlace: 'regMissile',
				subSubPlace: 'weapons'
				}, {
				key: 'weapons_techMissile',
				name: 'Högteknologiska projektilvapen',
				place: 'weapons',
				subPlace: 'techMissile',
				subSubPlace: 'weapons'
				}, {
				key: 'weapons_blackPowder',
				name: 'Svartkrutsvapen',
				place: 'weapons',
				subPlace: 'blackPowder',
				subSubPlace: 'weapons'
				}, {
				key: 'weapons_gun',
				name: 'Skjutvapen',
				place: 'weapons',
				subPlace: 'gun',
				subSubPlace: 'weapons'
				}, {
				key: 'weapons_homebuilt',
				name: 'Typiska hemmabyggen',
				place: 'weapons',
				subPlace: 'homebuilt',
				subSubPlace: 'weapons'
				}, {
				key: 'weapons_gyro',
				name: 'Gyrojet- och Gausvapen',
				place: 'weapons',
				subPlace: 'gyro',
				subSubPlace: 'weapons'
				}, {
				key: 'weapons_energy',
				name: 'Energivapen',
				place: 'weapons',
				subPlace: 'energy',
				subSubPlace: 'weapons'
				}, {
				key: 'weapons_regTrap',
				name: 'Vanliga fällor',
				place: 'weapons',
				subPlace: 'regTrap',
				subSubPlace: 'weapons'
				}, {
				key: 'weapons_granade',
				name: 'Granater',
				place: 'weapons',
				subPlace: 'granade',
				subSubPlace: 'weapons'
				}, {
				key: 'weapons_explosives',
				name: 'Sprängämnen och minor',
				place: 'weapons',
				subPlace: 'explosives',
				subSubPlace: 'weapons'
				}, {
				key: 'weapons_granadeLauncher',
				name: 'Granatvapen',
				place: 'weapons',
				subPlace: 'granadeLauncher',
				subSubPlace: 'weapons'
				}, {
				key: 'weapons_machineGun',
				name: 'Kulsprutur',
				place: 'weapons',
				subPlace: 'machineGun',
				subSubPlace: 'weapons'
				}, {
				key: 'weapons_armorPierce',
				name: 'Pansarvapen',
				place: 'weapons',
				subPlace: 'armorPierce',
				subSubPlace: 'weapons'
				}, {
				key: 'jobs',
				place: 'jobs'
				}, {
				key: 'skills',
				place: 'skills'
				}, {
				key: 'armors_primitive',
				name: 'Primitiva rustningar',
				place: 'armors',
				subPlace: 'primitive',
				subSubPlace: 'armors'
				}, {
				key: 'armors_kevlar',
				name: 'Kevlar- och Impactrustningar',
				place: 'armors',
				subPlace: 'kevlar',
				subSubPlace: 'armors'
				}, {
				key: 'armors_energyArmor',
				name: 'Energirustningar och reflecskydd',
				place: 'armors',
				subPlace: 'energyArmor',
				subSubPlace: 'armors'
				}, {
				key: 'shields',
				place: 'shields'
				}, {
				key: 'gear_spareParts',
				name: 'Reservdelar',
				place: 'gear',
				subPlace: 'spareParts',
				subSubPlace: 'items'
				}, {
				key: 'gear_foods',
				name: 'Mat, dryck & boende',
				place: 'gear',
				subPlace: 'foods',
				subSubPlace: 'items'
				}, {
				key: 'gear_animals/transport',
				name: 'Djur & transport',
				place: 'gear',
				subPlace: 'transport',
				subSubPlace: 'items'
				}, {
				key: 'gear_adventure',
				name: 'Expeditionsutrustning',
				place: 'gear',
				subPlace: 'adventure',
				subSubPlace: 'items'
				}, {
				key: 'gear_misc',
				name: 'Diverse utrustning',
				place: 'gear',
				subPlace: 'misc',
				subSubPlace: 'items'
				}, {
				key: 'gear_services',
				name: 'Tjänster',
				place: 'gear',
				subPlace: 'services',
				subSubPlace: 'items'
				}, {
				key: 'gear_tools',
				name: 'Verktyg',
				place: 'gear',
				subPlace: 'tools',
				subSubPlace: 'items'
				}, {
				key: 'gear_traps',
				name: 'Fällor och vapentillbehör',
				place: 'gear',
				subPlace: 'traps',
				subSubPlace: 'items'
				}
			];

		var storageM = function (forceReset) {
				if ($localStorage.storage === undefined || $localStorage.storage.version === undefined || $localStorage.storage.version !== version || forceReset === true) {
					$localStorage.storage = {
						version: version
					};
				}
			},
			storageMS = function (forceReset) {
				if ($localStorage.flatData === undefined || $localStorage.flatData.version === undefined || $localStorage.flatData.version !== staticData.version || forceReset === true) {
					if (dataLoaded) {
						$localStorage.flatData = angular.copy(staticData);
						$log.log('Mutant static data has been SET.');
					} else {
						$log.error('Data not ready for loading');
					}
				}
			};

		(function () {
			storageM();
			storageMS();
			Tabletop.then(function (data) {
				gSheets.forEach(function (s) {
					try {
						if (!s.key) {
							throw 'Error';
						}
						data[0][s.key].elements.forEach(function (e) {
							data[0][s.key].column_names.forEach(function (c) {
								if (e[c].length === 0) {
									//do nothing
								} else if (!isNaN(e[c])) {
									e[c] = Number(e[c]);
								} else if (e[c] === 'TRUE') {
									e[c] = true;
								} else if (e[c] === 'FALSE') {
									e[c] = false;
								} else if (e[c].charAt(0) === '[' && e[c].slice(-1) === ']') {
									e[c] = e[c].slice(1, -1).split(',');
									if (!angular.isArray(e[c])) {
										e[c] = [e[c]];
									}
								}
							});
						});
						if (s.subSubPlace) {
							if (staticData[s.place][s.subPlace] === undefined) {
								staticData[s.place][s.subPlace] = {};
							}
							staticData[s.place][s.subPlace][s.subSubPlace] = data[0][s.key].elements;
							if (s.name) {
								staticData[s.place][s.subPlace].name = s.name;
							}
						} else if (s.subPlace) {
							staticData[s.place][s.subPlace] = data[0][s.key].elements;
							if (s.name) {
								staticData[s.place].name = s.name;
							}
						} else if (s.place) {
							staticData[s.place] = data[0][s.key].elements;
						} else {
							throw 'Error';
						}
					} catch (err) {
						$log.error('Error on sheet: ' + s.key + ' :: ' + err);
					}
				});
				$log.debug('static data loaded');
				//$log.debug(JSON.stringify(staticData, null, '\t'));
				dataLoaded = true;
				storageM();
				storageMS();
			});
		})();

		return {
			resetStaticData: function () {
				storageMS(true);
			},
			resetData: function () {
				storageM(true);
			}
		};
	}]);
