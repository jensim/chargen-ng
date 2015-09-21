'use strict';

/**
 * @ngdoc service
 * @name chargenNgApp.mutantMongoServiceFactory
 * @description
 * # mutantMongoServiceFactory
 * Factory in the chargenNgApp.
 */
var logJson = function (text) {
	console.log(JSON.stringify(text, null, '\t'));
};

angular.module('chargenNgApp')
	.factory('mutantMongoServiceFactory', ['$http', '$localStorage', function ($http, $localStorage) {
		// Service logic
		// ...
		$localStorage.klasses = {
			imm: {
				name: 'Icke muterad människa',
				short: 'imm',
				ge: 91,
				minPrimAttr: 5,
				maxPrimAttr: 20,
				description: 'IMM lägger till två på allagrundegenskaper (GE), vilket innebär att de slår 3T6+2 på alla grundegenskaper. I detpoängbaserade systemet får IMM 91 poäng att sätta utpå sina grundegenskaper. IMM har också som enda klass tillgång till talanger. IMM får välja två valfria naturliga färdigheter som de kan köpa till 4xGE istället för 3xGE. En IMM kan alltså vara betydligt skickligare än RP från övriga klasser på två naturliga färdigheter.'
			},
			mm: {
				name: 'Muterad människa eller djur',
				short: 'mm',
				ge: 77,
				minPrimAttr: 3,
				maxPrimAttr: 18,
				description: 'Mutationer'
			},
			psi: {
				name: 'Psi-mutant',
				short: 'psi',

				ge: 77,
				minPrimAttr: 3,
				maxPrimAttr: 18,
				description: 'Farliga'
			},
			rbt: {
				name: 'Robot',
				short: 'rbt',
				ge: 77,
				minPrimAttr: 3,
				maxPrimAttr: 18,
				description: 'Tjänaren och underverket'
			}
		};
		$localStorage.attrPrim = {
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
		$localStorage.skills = {
			acrobatics: {
				name: 'AKROBATIK',
				description: '',
				natural: true,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			bow: {
				name: 'BÅGE',
				description: '',
				natural: true,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			firstaid: {
				name: 'FÖRSTAHJÄLPEN',
				description: '',
				natural: true,
				attrPrim: 'INT',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			guns: {
				name: 'GEVÄR',
				description: '',
				natural: true,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			perception: {
				name: 'IAKTAGELSEFÖRMÅGA',
				description: '',
				natural: true,
				attrPrim: 'INT',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			throww: {
				name: 'KASTA',
				description: '',
				natural: true,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			barter: {
				name: 'KÖPSLÅ',
				description: '',
				natural: true,
				attrPrim: 'PER',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			melee: {
				name: 'NÄRSTRID',
				description: '',
				natural: true,
				attrPrim: 'STY',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			handguns: {
				name: 'PISTOL',
				description: '',
				natural: true,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			sneak: {
				name: 'SMYGA / GÖMMA SIG',
				description: '',
				natural: true,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			education: {
				name: 'Bildning',
				description: '',
				natural: false,
				attrPrim: 'INT',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			boat: {
				name: 'Båt',
				description: '',
				natural: false,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			energyweapons: {
				name: 'Energivapen',
				description: '',
				natural: false,
				attrPrim: 'INT',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			sleightofhand: {
				name: 'Fingerfärdighet',
				description: '',
				natural: false,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			vehicle: {
				name: 'Fordon',
				description: '',
				natural: false,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			traps: {
				name: 'Fällor',
				description: '',
				natural: false,
				attrPrim: 'INT',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			lockpick: {
				name: 'Låsdyrkning',
				description: '',
				natural: false,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			science: {
				name: 'Naturvetenskap',
				description: '',
				natural: false,
				attrPrim: 'INT',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			medicin: {
				name: 'Medicin',
				description: '',
				natural: false,
				attrPrim: 'INT',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			repair: {
				name: 'Reparera',
				description: '',
				natural: false,
				attrPrim: 'INT',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			ride: {
				name: 'Rida',
				description: '',
				natural: false,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			gambling: {
				name: 'Spel',
				description: '',
				natural: false,
				attrPrim: 'INT',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			explosives: {
				name: 'Sprängämnen',
				description: '',
				natural: false,
				attrPrim: 'INT',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			martialarts: {
				name: 'Stridskonster',
				description: '',
				natural: false,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			technology: {
				name: 'Teknologi',
				description: '',
				natural: false,
				attrPrim: 'INT',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			heavyGuns: {
				name: 'Tunga vapen',
				description: '',
				natural: false,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			underWorld: {
				name: 'Undre världen',
				description: '',
				natural: false,
				attrPrim: 'PER',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			evade: {
				name: 'Undvika',
				description: '',
				natural: false,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			vagon: {
				name: 'Vagn',
				description: '',
				natural: false,
				attrPrim: 'SMI',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			wildlifeHabit: {
				name: 'Vildmarksvana',
				description: '',
				natural: false,
				attrPrim: 'INT',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			},
			zoneKnowledge: {
				name: 'Zonkunskap',
				description: '',
				natural: false,
				attrPrim: 'INT',
				valueErf: 0,
				valueErfFree: 0,
				valueSp: 0,
				valueSpFree: 0
			}
		};
		$localStorage.jobs = {
			administrator: {
				name: 'Administratör',
				description: '',
				startcapital: 80,
				trainedSkills: [
                    angular.copy($localStorage.skills.education),
                    angular.copy($localStorage.skills.ride),
                    angular.copy($localStorage.skills.technology),
                    angular.copy($localStorage.skills.evade),
                    angular.copy($localStorage.skills.vagon)
                ]
			},
			worker: {
				name: 'Arbetare',
				description: '',
				startcapital: 50,
				trainedSkills: [
                    angular.copy($localStorage.skills.sleightofhand),
                    angular.copy($localStorage.skills.ride),
                    angular.copy($localStorage.skills.gambling),
                    angular.copy($localStorage.skills.evade)
                ]
			},
			bonde: {
				name: 'Bonde',
				description: '',
				startcapital: 50,
				trainedSkills: [
                    angular.copy($localStorage.skills.repair),
                    angular.copy($localStorage.skills.gambling),
                    angular.copy($localStorage.skills.evade),
                    angular.copy($localStorage.skills.vagon),
                    angular.copy($localStorage.skills.wildlifeHabit)
                ]
			},
			aristocrat: {
				name: 'Aristokrat',
				description: '',
				startcapital: 500,
				trainedSkills: [
                    angular.copy($localStorage.skills.education),
                    angular.copy($localStorage.skills.ride),
                    angular.copy($localStorage.skills.gambling),
                    angular.copy($localStorage.skills.technology),
                    angular.copy($localStorage.skills.evade)
                ]
			},
			trader: {
				name: 'Handelsman',
				description: '',
				startcapital: 100,
				trainedSkills: [
                    angular.copy($localStorage.skills.education),
                    angular.copy($localStorage.skills.technology),
                    angular.copy($localStorage.skills.vagon),
                    angular.copy($localStorage.skills.underWorld),
                    angular.copy($localStorage.skills.evade)
                ]
			},
			craftsman: {
				name: 'Hantverkare',
				description: '',
				startcapital: 80,
				trainedSkills: [
                    angular.copy($localStorage.skills.education),
                    angular.copy($localStorage.skills.repair),
                    angular.copy($localStorage.skills.gambling),
                    angular.copy($localStorage.skills.technology),
                    angular.copy($localStorage.skills.evade)
                ]
			},
			hunter: {
				name: 'Jägare',
				description: '',
				startcapital: 50,
				trainedSkills: [
                    angular.copy($localStorage.skills.boat),
                    angular.copy($localStorage.skills.traps),
                    angular.copy($localStorage.skills.wildlifeHabit),
                    angular.copy($localStorage.skills.zoneKnowledge),
                    angular.copy($localStorage.skills.evade)
                ]
			},
			knower: {
				name: 'Kunskapare',
				description: '',
				startcapital: 80,
				trainedSkills: [
                    angular.copy($localStorage.skills.education),
                    angular.copy($localStorage.skills.technology),
                    angular.copy($localStorage.skills.science),
                    angular.copy($localStorage.skills.repair),
                    angular.copy($localStorage.skills.evade),
                    angular.copy($localStorage.skills.zoneKnowledge),
                    angular.copy($localStorage.skills.wildlifeHabit)

                ]
			},
			doctor: {
				name: 'Läkare',
				description: '',
				startcapital: 80,
				trainedSkills: [
                    angular.copy($localStorage.skills.education),
                    angular.copy($localStorage.skills.medicin),
                    angular.copy($localStorage.skills.technology),
                    angular.copy($localStorage.skills.evade),
                    angular.copy($localStorage.skills.vagon)

                ]
			},
			police: {
				name: 'Polis',
				description: '',
				startcapital: 60,
				trainedSkills: [
                    angular.copy($localStorage.skills.education),
                    angular.copy($localStorage.skills.ride),
                    angular.copy($localStorage.skills.gambling),
                    angular.copy($localStorage.skills.underWorld),
                    angular.copy($localStorage.skills.evade)

                ]
			},
			postmann: {
				name: 'Postiljon',
				description: '',
				startcapital: 60,
				trainedSkills: [
                    angular.copy($localStorage.skills.education),
                    angular.copy($localStorage.skills.ride),
                    angular.copy($localStorage.skills.technology),
                    angular.copy($localStorage.skills.evade),
                    angular.copy($localStorage.skills.wildlifeHabit)

                ]
			},
			sailer: {
				name: 'Sjöman',
				description: '',
				startcapital: 50,
				trainedSkills: [
                    angular.copy($localStorage.skills.education),
                    angular.copy($localStorage.skills.boat),
                    angular.copy($localStorage.skills.repair),
                    angular.copy($localStorage.skills.gambling),
                    angular.copy($localStorage.skills.evade)

                ]
			},
			soldier: {
				name: 'Soldat',
				description: '',
				startcapital: 60,
				trainedSkills: [
                    angular.copy($localStorage.skills.repair),
                    angular.copy($localStorage.skills.gambling),
                    angular.copy($localStorage.skills.explosives),
                    angular.copy($localStorage.skills.martialarts),
                    angular.copy($localStorage.skills.evade),
                    angular.copy($localStorage.skills.heavyGuns)
                ]
			},
			thief: {
				name: 'Tjuv',
				description: '',
				startcapital: 50,
				trainedSkills: [
                    angular.copy($localStorage.skills.sleightofhand),
                    angular.copy($localStorage.skills.traps),
                    angular.copy($localStorage.skills.lockpick),
                    angular.copy($localStorage.skills.underWorld),
                    angular.copy($localStorage.skills.evade)
                ]
			},
			explorer: {
				name: 'Upptäcksresande',
				description: '',
				startcapital: 50,
				trainedSkills: [
                    angular.copy($localStorage.skills.ride),
                    angular.copy($localStorage.skills.technology),
                    angular.copy($localStorage.skills.evade),
                    angular.copy($localStorage.skills.wildlifeHabit),
                    angular.copy($localStorage.skills.zoneKnowledge)
                ]
			}
		};
		$localStorage.skadeBonus = {
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
		$localStorage.attrSec = {
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
		$localStorage.powers = {
			imm: [
				{
					name: 'Arvegods',
					description: '',
					cost: 1
            }, {
					name: 'Egendom',
					description: '',
					cost: 2
            }, {
					name: 'Egendom',
					description: '',
					cost: 2
            }, {
					name: 'Gammal vän',
					description: '',
					cost: 2
            }, {
					name: 'Mentor',
					description: '',
					cost: 2
            }, {
					name: 'Inkomst',
					description: '',
					cost: 2
            }, {
					name: 'Kontakter',
					description: '',
					cost: 2
            }, {
					name: 'Rykte',
					description: '',
					cost: 2
            }, {
					name: 'Hemligt Sällskap',
					description: '',
					cost: 2
            }, {
					name: 'Status',
					description: '',
					cost: 2
            }
			],
			mm: [
				{
					name: 'Blixtsnabba Reflexer',
					description: '',
					cost: 3
            }, {
					name: 'Bärsärk',
					description: '',
					cost: 3,
					skill: {
						name: 'Bärsärk',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Dubbelhjärna',
					description: '',
					cost: 5
            }, {
					name: 'Eldkastare',
					description: '',
					cost: 2,
					skill: {
						name: 'Eldkastare',
						description: '',
						attrPrim: 'SMI',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Energikropp',
					description: '',
					cost: 3
            }, {
					name: 'Flerdubbla kroppsdelar',
					description: '',
					cost: 2
            }, {
					name: 'Fotosyntes',
					description: '',
					cost: 1
            }, {
					name: 'Giftig',
					description: '',
					cost: 1
            }, {
					name: 'Gälar och simhud',
					description: '',
					cost: 1
            }, {
					name: 'Gräsmage',
					description: '',
					cost: 1
            }, {
					name: 'Hoppförmåga',
					description: '',
					cost: 1
            }, {
					name: 'Jaktinstinkt',
					description: '',
					cost: 3,
					skill: {
						name: 'Jaktinstinkt',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Kameleont',
					description: '',
					cost: 3,
					skill: {
						name: 'Kameleont',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Kroppskontroll',
					description: '',
					cost: 2,
					skill: {
						name: 'Kroppskontroll',
						description: '',
						attrPrim: 'SMI',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Krypare',
					description: '',
					cost: 2
            }, {
					name: 'Liten',
					description: '',
					cost: 2
            }, {
					name: 'Magnetism',
					description: '',
					cost: 3,
					skill: {
						name: 'Magnetism',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Naturligt vapen 1',
					description: '',
					cost: 1
            }, {
					name: 'Naturligt vapen 2',
					description: '',
					cost: 2
            }, {
					name: 'Nattsyn',
					description: '',
					cost: 1
            }, {
					name: 'Pansar 1',
					description: '',
					cost: 1
            }, {
					name: 'Pansar 2',
					description: '',
					cost: 2
            }, {
					name: 'Pansar 3',
					description: '',
					cost: 3
            }, {
					name: 'Pansar 4',
					description: '',
					cost: 4
            }, {
					name: 'Pansar 5',
					description: '',
					cost: 5
            }, {
					name: 'Regenerera 1',
					description: '',
					cost: 1
            }, {
					name: 'Regenerera 2',
					description: '',
					cost: 2
            }, {
					name: 'Regenerera 3',
					description: '',
					cost: 3
            }, {
					name: 'Resistens',
					description: '',
					cost: 1
            }, {
					name: 'Riktningsknöl',
					description: '',
					cost: 1
            }, {
					name: 'Robust',
					description: '',
					cost: 4
            }, {
					name: 'Silverskinn',
					description: '',
					cost: 1
            }, {
					name: 'Sonar',
					description: '',
					cost: 2,
					skill: {
						name: 'Sonar',
						description: '',
						attrPrim: 'INT',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Sprinter',
					description: '',
					cost: 1
            }, {
					name: 'Stor',
					description: '',
					cost: 3
            }, {
					name: 'Stryktålig',
					description: '',
					cost: 3
            }, {
					name: 'Sugkoppar',
					description: '',
					cost: 2
            }, {
					name: 'Superbt sinne',
					description: '',
					cost: 1
            }, {
					name: 'Syraspott',
					description: '',
					cost: 2,
					skill: {
						name: 'Syraspott',
						description: '',
						attrPrim: 'SMI',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Teleskopögon',
					description: '',
					cost: 1
            }, {
					name: 'Vidgat synfält 1',
					description: '',
					cost: 1
            }, {
					name: 'Vidgat synfält 2',
					description: '',
					cost: 2
            }, {
					name: 'Vingar (Glid)',
					description: '',
					cost: 1,
					skill: {
						name: 'Glidflyga',
						description: '',
						attrPrim: 'SMI',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Vingar (Flyg)',
					description: '',
					cost: 2,
					skill: {
						name: 'Flyga',
						description: '',
						attrPrim: 'SMI',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }
			],
			psi: [
				{
					name: 'Astral projektion',
					description: '',
					cost: 3,
					skill: {
						name: 'Astral projektion',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Djurmästare',
					description: '',
					cost: 2,
					skill: {
						name: 'Djurmästare',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Dominera',
					description: '',
					cost: 4,
					skill: {
						name: 'Dominera',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Dödsknäpp',
					description: '',
					cost: 3,
					skill: {
						name: 'Dödsknäpp',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Empati',
					description: '',
					cost: 1,
					skill: {
						name: 'Empati',
						description: '',
						attrPrim: 'INT',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Fokus',
					description: '',
					cost: 2,
					skill: {
						name: 'Fokus',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Förbränning',
					description: '',
					cost: 3,
					skill: {
						name: 'Förbränning',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Förvirring',
					description: '',
					cost: 2,
					skill: {
						name: 'Förvirring',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Illusion',
					description: '',
					cost: 4,
					skill: {
						name: 'Illusion',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Intuition',
					description: '',
					cost: 1,
					skill: {
						name: 'Intuition',
						description: '',
						attrPrim: 'INT',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Kraftfält',
					description: '',
					cost: 2,
					skill: {
						name: 'Kraftfält',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Kraftprov',
					description: '',
					cost: 1,
					skill: {
						name: 'Kraftprov',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Levitera',
					description: '',
					cost: 1,
					skill: {
						name: 'Levitera',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Livslänk',
					description: '',
					cost: 2,
					skill: {
						name: 'Livslänk',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Lokalisera',
					description: '',
					cost: 1,
					skill: {
						name: 'Lokalisera',
						description: '',
						attrPrim: 'INT',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Läkande händer',
					description: '',
					cost: 4,
					skill: {
						name: 'Läkande händer',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Mental sköld',
					description: '',
					cost: 2,
					skill: {
						name: 'Mental sköld',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Osynlighet',
					description: '',
					cost: 3,
					skill: {
						name: 'Osynlighet',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Paralysera',
					description: '',
					cost: 3,
					skill: {
						name: 'Paralysera',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Parasit',
					description: '',
					cost: 2,
					skill: {
						name: 'Parasit',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Psistöt',
					description: '',
					cost: 1,
					skill: {
						name: 'Psistöt',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Psykometri',
					description: '',
					cost: 1,
					skill: {
						name: 'Psykometri',
						description: '',
						attrPrim: 'INT',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Sannolikhetsförändring',
					description: '',
					cost: 2,
					skill: {
						name: 'Sannolikhetsförändring',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Simultankapacitet',
					description: '',
					cost: 3,
					skill: {
						name: 'Simultankapacitet',
						description: '',
						attrPrim: 'INT',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Sjätte sinne',
					description: '',
					cost: 1,
					skill: {
						name: 'Sjätte sinne',
						description: '',
						attrPrim: 'INT',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Skräck',
					description: '',
					cost: 2,
					skill: {
						name: 'Skräck',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Telekenesi',
					description: '',
					cost: 2,
					skill: {
						name: 'Telekenesi',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Telepati',
					description: '',
					cost: 2,
					skill: {
						name: 'Telepati',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }, {
					name: 'Väderkontroll',
					description: '',
					cost: 3,
					skill: {
						name: 'Väderkontroll',
						description: '',
						attrPrim: 'VIL',
						valueErf: 0,
						valueErfFree: 0,
						valueSp: 0,
						valueSpFree: 1
					}
            }
			],
			rbt: [
				{
					name: 'Analysenhet',
					description: '',
					cost: 1
            }, {
					name: 'Batteriladdare',
					description: '',
					cost: 3
            }, {
					name: 'Betapersonlighet',
					description: '',
					cost: 2
            }, {
					name: 'Cyberdeck',
					description: '',
					cost: 3
            }, {
					name: 'Databank 1-5 poäng',
					description: 'Roboten är försedd med en databank vilket ger den specialkunskaper innom ett naturvetenskapligt område; Medecin, Naturvetenskap eller Reparation. Varje SP ger roboten tillgång till ett specialområde innom vilket roboten anses ha 1,5 x Medecin / Naturvetenskap / Reparera.',
					cost: 1
            }, {
					name: 'EMP-skydd',
					description: '',
					cost: 1
            }, {
					name: 'Extra reservdelar (1-5 poäng)',
					description: '2 delar per poäng.',
					cost: 1
            }, {
					name: 'Gastronom',
					description: '',
					cost: 1
            }, {
					name: 'Intercom',
					description: '',
					cost: 1
            }, {
					name: 'Integralenhet',
					description: '',
					cost: 3
            }, {
					name: 'Interface',
					description: '',
					cost: 1
            }, {
					name: 'Internbehållare',
					description: '',
					cost: 1
            }, {
					name: 'Kemotermisk barriär',
					description: '',
					cost: 2
            }, {
					name: 'Medikit',
					description: '',
					cost: 3
            }, {
					name: 'Mikroskopöga',
					description: '',
					cost: 1
            }, {
					name: 'Modifierad beteendespärr',
					description: '',
					cost: 3
            }, {
					name: 'Pansar (1-3 poäng)',
					description: '2 pansar per poäng utöver robotens befintliga 4 ABS.',
					cost: 1
            }, {
					name: 'Sekundärsystem',
					description: '',
					cost: 4
            }, {
					name: 'Sensorer (IR)',
					description: '',
					cost: 1
            }, {
					name: 'Sensorer (Sonar)',
					description: '',
					cost: 1
            }, {
					name: 'Sensorer (Radar)',
					description: '',
					cost: 1
            }, {
					name: 'Tolkenhet',
					description: '',
					cost: 5
            }, {
					name: 'Vapen',
					description: '',
					cost: 2
            }, {
					name: 'Vapen ',
					description: '',
					cost: 4
            }, {
					name: 'Verktygsset',
					description: '',
					cost: 1
            }, {
					name: 'Verktygsset & verkstad',
					description: '',
					cost: 3
            }, {
					name: 'ögonlaser',
					description: '',
					cost: 3
            }
			]
		};

		//angular.copy(jobs.bonde.trainedSkills, templateChars[0].skills);

		// Public API here
		return {
			newCharacter: function (iklass, ijob) {
				var newChar = {
					name: 'ny',
					klass: angular.copy(iklass),
					job: angular.copy(ijob),
					attrPrim: angular.copy($localStorage.attrPrim),
					attrSec: angular.copy($localStorage.attrSec),
					skills: angular.copy(ijob.trainedSkills)
				};
				var skill;
				for (skill in $localStorage.skills) {
					if ($localStorage.skills[skill].natural) {
						newChar.skills.push(angular.copy($localStorage.skills[skill]));
					}
				}
				return newChar;
			},
			saveCharacter: function (character) {
				if (character) {
					if ($localStorage.characters === undefined) {
						$localStorage.characters = [character];
						return;
					}
					var existsIndex = -1,
						i;
					for (i = 0; i < $localStorage.characters.length; i += 1) {
						if ($localStorage.characters[i].name === character.name) {
							existsIndex = i;
						}
					}
					if (existsIndex >= 0) {
						$localStorage.characters[existsIndex] = character;
					} else {
						$localStorage.characters.push(character);
					}
				}
			},
			deleteCharacter: function (character) {
				var i;
				for (i = 0; i < $localStorage.characters.length; i += 1) {
					if ($localStorage.characters[i].name === character.name) {
						$localStorage.characters.splice(i, 1);
						return;
					}
				}
			},
			deletePower: function (power) {
				var p;
				for (p in $localStorage.activeCharacter.powers) {
					if ($localStorage.activeCharacter.powers[p] === power) {
						if ($localStorage.activeCharacter.powers[p].skill !== undefined) {
							var s;
							for (s in $localStorage.activeCharacter.skills) {
								if ($localStorage.activeCharacter.skills[s].name === $localStorage.activeCharacter.powers[p].skill.name) {
									$localStorage.activeCharacter.skills.splice(s, 1);
								}
							}
						}
						$localStorage.activeCharacter.powers.splice(p, 1);
						break;
					}
				}
			},
			loadCharacters: function () {
				if ($localStorage.characters) {
					return $localStorage.characters;
				} else {
					return {};
				}
			}
		};
    }]);
