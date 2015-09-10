'use strict';

/**
 * @ngdoc service
 * @name chargenNgApp.mutantMongoServiceFactory
 * @description
 * # mutantMongoServiceFactory
 * Factory in the chargenNgApp.
 */
angular.module('chargenNgApp')
    .factory('mutantMongoServiceFactory', ['$http', function ($http) {
        // Service logic
        // ...
        var klasses = {
            imm: {
                name: 'Icke muterad människa',
                sp: 91,
                minPrimAttr: 5,
                maxPrimAttr: 20,
                description: 'IMM lägger till två på allagrundegenskaper (GE), vilket innebär att de slår 3T6+2 på alla grundegenskaper. I detpoängbaserade systemet får IMM 91 poäng att sätta utpå sina grundegenskaper. IMM har också som enda klass tillgång till talanger. IMM får välja två valfria naturliga färdigheter som de kan köpa till 4xGE istället för 3xGE. En IMM kan alltså vara betydligt skickligare än RP från övriga klasser på två naturliga färdigheter.'
            },
            mm: {
                name: 'Muterad människa eller djur',
                sp: 77,
                minPrimAttr: 3,
                maxPrimAttr: 18,
                description: 'Mutationer'
            },
            psi: {
                name: 'Psi-mutant',
                sp: 77,
                minPrimAttr: 3,
                maxPrimAttr: 18,
                description: 'Farliga'
            },
            rbt: {
                name: 'Robot',
                sp: 77,
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
                primAttr: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            bow: {
                name: 'BÅGE',
                description: '',
                natural: true,
                primAttr: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            firstaid: {
                name: 'FÖRSTAHJÄLPEN',
                description: '',
                natural: true,
                primAttr: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            guns: {
                name: 'GEVÄR',
                description: '',
                natural: true,
                primAttr: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            percepton: {
                name: 'IAKTAGELSEFÖRMÅGA',
                description: '',
                natural: true,
                primAttr: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            throww: {
                name: 'KASTA',
                description: '',
                natural: true,
                primAttr: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            barter: {
                name: 'KÖPSLÅ',
                description: '',
                natural: true,
                primAttr: attrPrim.PER,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            melee: {
                name: 'NÄRSTRID',
                description: '',
                natural: true,
                primAttr: attrPrim.STY,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            handguns: {
                name: 'PISTOL',
                description: '',
                natural: true,
                primAttr: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            sneak: {
                name: 'SMYGA / GÖMMA SIG',
                description: '',
                natural: true,
                primAttr: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            education: {
                name: 'Bildning',
                description: '',
                natural: false,
                primAttr: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            boat: {
                name: 'Båt',
                description: '',
                natural: false,
                primAttr: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            energyweapons: {
                name: 'Energivapen',
                description: '',
                natural: false,
                primAttr: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            sleightofhand: {
                name: 'Fingerfärdighet',
                description: '',
                natural: false,
                primAttr: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            vehicle: {
                name: 'Fordon',
                description: '',
                natural: false,
                primAttr: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            traps: {
                name: 'Fällor',
                description: '',
                natural: false,
                primAttr: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            lockpick: {
                name: 'Låsdyrkning',
                description: '',
                natural: false,
                primAttr: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            science: {
                name: 'Naturvetenskap',
                description: '',
                natural: false,
                primAttr: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            medicin: {
                name: 'Medicin',
                description: '',
                natural: false,
                primAttr: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            repair: {
                name: 'Reparera',
                description: '',
                natural: false,
                primAttr: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            ride: {
                name: 'Rida',
                description: '',
                natural: false,
                primAttr: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            gambling: {
                name: 'Spel',
                description: '',
                natural: false,
                primAttr: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            explosives: {
                name: 'Sprängämnen',
                description: '',
                natural: false,
                primAttr: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            martialarts: {
                name: 'Stridskonster',
                description: '',
                natural: false,
                primAttr: attrPrim.SMI,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            },
            technology: {
                name: 'Teknologi',
                description: '',
                natural: false,
                primAttr: attrPrim.INT,
                valueErf: 0,
                valueErfFree: 0,
                valueSp: 0,
                valueSpFree: 0
            }
        };

        var jobs = {
            bonde: {
                name: 'Bonde',
                description: 'jobba m jord o lort',
                startcapital: 0,
                trainedSkills: [skills.repair]
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
        var templateChars = [{
            name: 'one',
            klass: klasses.imm,
            job: jobs.bonde,
            attrPrim: attrPrim,
            attrSec: attrSec,
            skills: jobs.bonde.trainedSkills
                }];
        //angular.copy(jobs.bonde.trainedSkills, templateChars[0].skills);
        var i = 0;
        var skillKeys = Object.keys(skills);
        for (; i < skillKeys.length; i += 1) {
            if (skills[skillKeys[i]].natural) {
                templateChars[0].skills.push(skills[skillKeys[i]]);
            }else{
                //console.error('skill not natural'+ JSON.stringify(skills[i]));
            }
        }

        // Public API here
        return {
            getCharacters: function () {
                return templateChars;
            },
            getClasses: function () {
                return klasses;
            },
            getJobs: function () {
                return jobs;
            }
        };
    }]);
