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
				templateUrl: 'views/mutant.html',
				controller: 'MutantCtrl',
				controllerAs: 'mutant'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
