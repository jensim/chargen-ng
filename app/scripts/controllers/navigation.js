'use strict';

/**
 * @ngdoc function
 * @name chargenNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chargenNgApp
 */
angular.module('chargenNgApp')
    .controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.menus = [{name: 'Mutant', route: '/mutant'},
                       {name: 'Svavelvinter', route: '/svavelvinter'},
                       {name: 'DnD 5', route: '/dnd5'},
                       {name: 'DnD 3.5', route: '/dnd35'},
                       {name: 'Drakar och Demoner', route: '/dod'}];
        $scope.getActiveClass = function (location) {
            if (location === $location.path().substr(0, location.length)) {
                return 'active';
            } else {
                return '';
            }
        };
    }]);
