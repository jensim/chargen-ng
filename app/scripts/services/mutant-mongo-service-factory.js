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
                ge: 91,
                minPrimAttr: 5,
                maxPrimAttr: 20,
                description: 'IMM lägger till två på allagrundegenskaper (GE), vilket innebär att de slår 3T6+2 på alla grundegenskaper. I detpoängbaserade systemet får IMM 91 poäng att sätta utpå sina grundegenskaper. IMM har också som enda klass tillgång till talanger. IMM får välja två valfria naturliga färdigheter som de kan köpa till 4xGE istället för 3xGE. En IMM kan alltså vara betydligt skickligare än RP från övriga klasser på två naturliga färdigheter.'
            },
            mm: {
                name: 'Muterad människa eller djur',
                ge: 77,
                minPrimAttr: 3,
                maxPrimAttr: 18,
                description: 'Mutationer'
            },
            psi: {
                name: 'Psi-mutant',
                ge: 77,
                minPrimAttr: 3,
                maxPrimAttr: 18,
                description: 'Farliga'
            },
            rbt: {
                name: 'Robot',
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
                mod: 0
            },
            FYS: {
                name: 'Fysik',
                short: 'FYS',
                description: '',
                value: 5,
                mod: 0
            },
            STO: {
                name: 'Storlek',
                short: 'STO',
                description: '',
                value: 5,
                mod: 0
            },
            SMI: {
                name: 'Smidighet',
                short: 'SMI',
                description: '',
                value: 5,
                mod: 0
            },
            INT: {
                name: 'Intelligens',
                short: 'INT',
                description: '',
                value: 5,
                mod: 0
            },
            VIL: {
                name: 'Vilja',
                short: 'VIL',
                description: '',
                value: 5,
                mod: 0
            },
            PER: {
                name: 'Personlighet',
                short: 'PER',
                description: '',
                value: 5,
                mod: 0
            }
        };
        $localStorage.skills = {
            acrobatics: {
                name: 'AKROBATIK',
                description: '',
                natural: true,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            bow: {
                name: 'BÅGE',
                description: '',
                natural: true,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            firstaid: {
                name: 'FÖRSTAHJÄLPEN',
                description: '',
                natural: true,
                attrPrim: $localStorage.attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            guns: {
                name: 'GEVÄR',
                description: '',
                natural: true,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            perception: {
                name: 'IAKTAGELSEFÖRMÅGA',
                description: '',
                natural: true,
                attrPrim: $localStorage.attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            throww: {
                name: 'KASTA',
                description: '',
                natural: true,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            barter: {
                name: 'KÖPSLÅ',
                description: '',
                natural: true,
                attrPrim: $localStorage.attrPrim.PER,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            melee: {
                name: 'NÄRSTRID',
                description: '',
                natural: true,
                attrPrim: $localStorage.attrPrim.STY,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            handguns: {
                name: 'PISTOL',
                description: '',
                natural: true,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            sneak: {
                name: 'SMYGA / GÖMMA SIG',
                description: '',
                natural: true,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            education: {
                name: 'Bildning',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            boat: {
                name: 'Båt',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            energyweapons: {
                name: 'Energivapen',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            sleightofhand: {
                name: 'Fingerfärdighet',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            vehicle: {
                name: 'Fordon',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            traps: {
                name: 'Fällor',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            lockpick: {
                name: 'Låsdyrkning',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            science: {
                name: 'Naturvetenskap',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            medicin: {
                name: 'Medicin',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            repair: {
                name: 'Reparera',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            ride: {
                name: 'Rida',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            gambling: {
                name: 'Spel',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            explosives: {
                name: 'Sprängämnen',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            martialarts: {
                name: 'Stridskonster',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            technology: {
                name: 'Teknologi',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            heavyGuns: {
                name: 'Tunga vapen',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            underWorld: {
                name: 'Undre världen',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.PER,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            evade: {
                name: 'Undvika',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            vagon: {
                name: 'Vagn',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            wildlifeHabit: {
                name: 'Vildmarksvana',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            zoneKnowledge: {
                name: 'Zonkunskap',
                description: '',
                natural: false,
                attrPrim: $localStorage.attrPrim.INT,
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
            loadCharacters: function () {
                if ($localStorage.characters) {
                    return $localStorage.characters;
                } else {
                    return {};
                }
            }
        };
    }]);
