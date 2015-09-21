'use strict';

/**
 * @ngdoc function
 * @name chargenNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chargenNgApp
 */
angular.module('chargenNgApp')
	.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
		var getProgress = function (milestone) {
			if (milestone === undefined) {
				return 0;
			} else if (milestone.closed_issues === 0) {
				return 0;
			} else if (milestone.open_issues === 0) {
				return 100;
			} else {
				return milestone.open_issues / (milestone.open_issues + milestone.closed_issues) * 100;
			}

		};
		$http.get('https://api.github.com/repos/jensim/chargen-ng/milestones')
			.then(function (res) { //SUCCESS
				$scope.milestones = res.data;
				var m;
				for (m in $scope.milestones) {
					$scope.milestones[m].progress = getProgress($scope.milestones[m]);
				}
			}, function (res) { //FAIL
				console.error('Failed loading milestones');
				$scope.milestones = [];
			});
    }]);
