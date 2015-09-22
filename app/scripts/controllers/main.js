'use strict';

/**
 * @ngdoc function
 * @name chargenNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chargenNgApp
 */
angular.module('chargenNgApp')
	.controller('MainCtrl', ['$localStorage', '$scope', '$http', function ($localStorage, $scope, $http) {
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

			},
			resetAll = function () {
				$localStorage.$reset();
				console.log(JSON.stringify($localStorage, null, '\t'));
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
		$scope.resetCachedItems = function () {
			console.log();
			resetAll();
		};
				}]);
