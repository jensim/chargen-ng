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
    'ngStorage',
	'times.tabletop'
  ])
	.config(function ($routeProvider, TabletopProvider) {

		TabletopProvider.setTabletopOptions({
			key: 'https://docs.google.com/spreadsheets/d/1-O2dpXX923Hetv2P24XpN4KhhLSr7-NJ-rnrx_pB_ug/pubhtml'
		});

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
			.when('/dod', {
				templateUrl: 'views/dod.html',
				controller: 'DodCtrl',
				controllerAs: 'dod'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
