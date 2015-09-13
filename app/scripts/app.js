'use strict';

/**
 * @ngdoc overview
 * @name chargenNgApp
 * @description
 * # chargenNgApp
 *
 * Main module of the application.
 */
angular
    .module('chargenNgApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage'
  ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/mutant', {
                templateUrl: 'views/mutant.html',
                controller: 'MutantCtrl',
                controllerAs: 'mutant'
            })
            .when('/dnd35', {
                templateUrl: 'views/dnd35.html',
                controller: 'Dnd35Ctrl',
                controllerAs: 'dnd35'
            })
            .when('/dnd5', {
                templateUrl: 'views/dnd5.html',
                controller: 'Dnd5Ctrl',
                controllerAs: 'dnd5'
            })
            .when('/svavelvinter', {
                templateUrl: 'views/svavelvinter.html',
                controller: 'SvavelvinterCtrl',
                controllerAs: 'svavelvinter'
            })
            .when('/dod', {
                templateUrl: 'views/dod.html',
                controller: 'DodCtrl',
                controllerAs: 'dod'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
