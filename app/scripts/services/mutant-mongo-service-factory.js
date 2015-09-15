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
        var klasses = {
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
        var attrPrim = {
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
        var skills = {
            acrobatics: {
                name: 'AKROBATIK',
                description: '',
                natural: true,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            bow: {
                name: 'BÅGE',
                description: '',
                natural: true,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            firstaid: {
                name: 'FÖRSTAHJÄLPEN',
                description: '',
                natural: true,
                attrPrim: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            guns: {
                name: 'GEVÄR',
                description: '',
                natural: true,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            perception: {
                name: 'IAKTAGELSEFÖRMÅGA',
                description: '',
                natural: true,
                attrPrim: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            throww: {
                name: 'KASTA',
                description: '',
                natural: true,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            barter: {
                name: 'KÖPSLÅ',
                description: '',
                natural: true,
                attrPrim: attrPrim.PER,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            melee: {
                name: 'NÄRSTRID',
                description: '',
                natural: true,
                attrPrim: attrPrim.STY,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            handguns: {
                name: 'PISTOL',
                description: '',
                natural: true,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            sneak: {
                name: 'SMYGA / GÖMMA SIG',
                description: '',
                natural: true,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            education: {
                name: 'Bildning',
                description: '',
                natural: false,
                attrPrim: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            boat: {
                name: 'Båt',
                description: '',
                natural: false,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            energyweapons: {
                name: 'Energivapen',
                description: '',
                natural: false,
                attrPrim: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            sleightofhand: {
                name: 'Fingerfärdighet',
                description: '',
                natural: false,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            vehicle: {
                name: 'Fordon',
                description: '',
                natural: false,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            traps: {
                name: 'Fällor',
                description: '',
                natural: false,
                attrPrim: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            lockpick: {
                name: 'Låsdyrkning',
                description: '',
                natural: false,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            science: {
                name: 'Naturvetenskap',
                description: '',
                natural: false,
                attrPrim: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            medicin: {
                name: 'Medicin',
                description: '',
                natural: false,
                attrPrim: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            repair: {
                name: 'Reparera',
                description: '',
                natural: false,
                attrPrim: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            ride: {
                name: 'Rida',
                description: '',
                natural: false,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            gambling: {
                name: 'Spel',
                description: '',
                natural: false,
                attrPrim: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            explosives: {
                name: 'Sprängämnen',
                description: '',
                natural: false,
                attrPrim: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            martialarts: {
                name: 'Stridskonster',
                description: '',
                natural: false,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            technology: {
                name: 'Teknologi',
                description: '',
                natural: false,
                attrPrim: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            heavyGuns: {
                name: 'Tunga vapen',
                description: '',
                natural: false,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            underWorld: {
                name: 'Undre världen',
                description: '',
                natural: false,
                attrPrim: attrPrim.PER,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            evade: {
                name: 'Undvika',
                description: '',
                natural: false,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            vagon: {
                name: 'Vagn',
                description: '',
                natural: false,
                attrPrim: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            wildlifeHabit: {
                name: 'Vildmarksvana',
                description: '',
                natural: false,
                attrPrim: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            zoneKnowledge: {
                name: 'Zonkunskap',
                description: '',
                natural: false,
                attrPrim: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            }
        };
        var jobs = {
            administrator: {
                name: 'Administratör',
                description: '',
                startcapital: 80,
                trainedSkills: [
                    angular.copy(skills.education),
                    angular.copy(skills.ride),
                    angular.copy(skills.technology),
                    angular.copy(skills.evade),
                    angular.copy(skills.vagon)
                ]
            },
            worker: {
                name: 'Arbetare',
                description: '',
                startcapital: 50,
                trainedSkills: [
                    angular.copy(skills.sleightofhand),
                    angular.copy(skills.ride),
                    angular.copy(skills.gambling),
                    angular.copy(skills.evade)
                ]
            },
            bonde: {
                name: 'Bonde',
                description: '',
                startcapital: 50,
                trainedSkills: [
                    angular.copy(skills.repair),
                    angular.copy(skills.gambling),
                    angular.copy(skills.evade),
                    angular.copy(skills.vagon),
                    angular.copy(skills.wildlifeHabit)
                ]
            },
            aristocrat: {
                name: 'Aristokrat',
                description: '',
                startcapital: 500,
                trainedSkills: [
                    angular.copy(skills.education),
                    angular.copy(skills.ride),
                    angular.copy(skills.gambling),
                    angular.copy(skills.technology),
                    angular.copy(skills.evade)
                ]
            },
            trader: {
                name: 'Handelsman',
                description: '',
                startcapital: 100,
                trainedSkills: [
                    angular.copy(skills.education),
                    angular.copy(skills.technology),
                    angular.copy(skills.vagon),
                    angular.copy(skills.underWorld),
                    angular.copy(skills.evade)
                ]
            },
            craftsman: {
                name: 'Hantverkare',
                description: '',
                startcapital: 80,
                trainedSkills: [
                    angular.copy(skills.education),
                    angular.copy(skills.repair),
                    angular.copy(skills.gambling),
                    angular.copy(skills.technology),
                    angular.copy(skills.evade)
                ]
            },
            hunter: {
                name: 'Jägare',
                description: '',
                startcapital: 50,
                trainedSkills: [
                    angular.copy(skills.boat),
                    angular.copy(skills.traps),
                    angular.copy(skills.wildlifeHabit),
                    angular.copy(skills.zoneKnowledge),
                    angular.copy(skills.evade)
                ]
            },
            knower: {
                name: 'Kunskapare',
                description: '',
                startcapital: 80,
                trainedSkills: [
                    angular.copy(skills.education),
                    angular.copy(skills.technology),
                    angular.copy(skills.science),
                    angular.copy(skills.repair),
                    angular.copy(skills.evade),
                    angular.copy(skills.zoneKnowledge),
                    angular.copy(skills.wildlifeHabit)

                ]
            },
            doctor: {
                name: 'Läkare',
                description: '',
                startcapital: 80,
                trainedSkills: [
                    angular.copy(skills.education),
                    angular.copy(skills.medicin),
                    angular.copy(skills.technology),
                    angular.copy(skills.evade),
                    angular.copy(skills.vagon)

                ]
            },
            police: {
                name: 'Polis',
                description: '',
                startcapital: 60,
                trainedSkills: [
                    angular.copy(skills.education),
                    angular.copy(skills.ride),
                    angular.copy(skills.gambling),
                    angular.copy(skills.underWorld),
                    angular.copy(skills.evade)

                ]
            },
            postmann: {
                name: 'Postiljon',
                description: '',
                startcapital: 60,
                trainedSkills: [
                    angular.copy(skills.education),
                    angular.copy(skills.ride),
                    angular.copy(skills.technology),
                    angular.copy(skills.evade),
                    angular.copy(skills.wildlifeHabit)

                ]
            },
            sailer: {
                name: 'Sjöman',
                description: '',
                startcapital: 50,
                trainedSkills: [
                    angular.copy(skills.education),
                    angular.copy(skills.boat),
                    angular.copy(skills.repair),
                    angular.copy(skills.gambling),
                    angular.copy(skills.evade)

                ]
            },
            soldier: {
                name: 'Soldat',
                description: '',
                startcapital: 60,
                trainedSkills: [
                    angular.copy(skills.repair),
                    angular.copy(skills.gambling),
                    angular.copy(skills.explosives),
                    angular.copy(skills.martialarts),
                    angular.copy(skills.evade),
                    angular.copy(skills.heavyGuns)
                ]
            },
            thief: {
                name: 'Tjuv',
                description: '',
                startcapital: 50,
                trainedSkills: [
                    angular.copy(skills.sleightofhand),
                    angular.copy(skills.traps),
                    angular.copy(skills.lockpick),
                    angular.copy(skills.underWorld),
                    angular.copy(skills.evade)
                ]
            },
            explorer: {
                name: 'Upptäcksresande',
                description: '',
                startcapital: 50,
                trainedSkills: [
                    angular.copy(skills.ride),
                    angular.copy(skills.technology),
                    angular.copy(skills.evade),
                    angular.copy(skills.wildlifeHabit),
                    angular.copy(skills.zoneKnowledge)
                ]
            }
        };
        var attrSec = {
            sb: {
                name: 'SKADEBONUS (SB)',
                description: '',
                value: 0
            },
            ib: {
                name: 'INITIATIVBONUS (IB)',
                description: '',
                value: 0
            },
            bf: {
                name: 'BÄRFÖRMÅGA (BF)',
                description: '',
                value: 0
            },
            rea: {
                name: 'REAKTIONSVÄRDE (REA)',
                description: '',
                value: 0
            },
            ryk: {
                name: 'RYKTE',
                description: '',
                value: 0
            },
            sts: {
                name: 'STATUS',
                description: '',
                value: 0
            },
            ffstrid: {
                name: 'FF – STRID',
                description: '',
                value: 0
            },
            ffspring: {
                name: 'FF – SPRINGA',
                description: '',
                value: 0
            },
            ffsprint: {
                name: 'FF – SPRINT',
                description: '',
                value: 0
            },
            kp: {
                name: 'KROPPSPOÄNG (KP)',
                description: '',
                value: 0
            },
            tt: {
                name: 'TRAUMATRÖSKEL (TT)',
                description: '',
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
                    attrPrim: angular.copy(attrPrim),
                    attrSec: angular.copy(attrSec),
                    skills: angular.copy(ijob.trainedSkills)
                };
                delete(newChar.klass.description);
                var attr;
                for (attr in newChar.attrPrim) {
                    delete newChar.attrPrim[attr].description;
                }
                for (attr in newChar.attrSec) {
                    delete newChar.attrSec[attr].description;
                }
                var skill;
                for (skill in skills) {
                    if (skills[skill].natural) {
                        var newSkill = angular.copy(skills[skill]);
                        delete newSkill.description;
                        newChar.skills.push(newSkill);
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
                    var existsIndex = -1;
                    for (var i = 0; i < $localStorage.characters.length; i += 1) {
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
                for (var i = 0; i < $localStorage.characters.length; i += 1) {
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
            },
            getClasses: function () {
                return klasses;
            },
            getJobs: function () {
                return jobs;
            }
        };
    }]);
