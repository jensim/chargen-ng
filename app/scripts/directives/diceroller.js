'use strict';

/**
 * @ngdoc directive
 * @name chargenNgApp.directive:diceroller
 * @description
 * # diceroller
 */
angular.module('chargenNgApp')
    .directive('diceroller', ['$timeout', function ($timeout) {
        return {
            templateUrl: 'views/directive-templates/diceroller.html',
            restrict: 'E',
            scope: true,
            controller: function ($scope, $element) {
                $scope.result = '';
                var diceClasses = ['fi-die-one', 'fi-die-two', 'fi-die-three', 'fi-die-four', 'fi-die-five', 'fi-die-six'];
                $scope.diceClass = diceClasses[Math.floor(Math.random() * diceClasses.length)];
                var currentDiceClass = 2,
                    forceShow = false,
                    hoverShow = false,
                    result = -1,
                    timeout,
                    showTime = $element.attr('show') ? $element.attr('show') : 3500,
                    //init parse attrs
                    rollDice = function () {
                        var i, sum = 0,
                            diceParts = $element.attr('dice') ? $element.attr('dice').split(' ') : ['0D6'];
                        for (i = 0; i < diceParts.length; i += 1) {
                            var dicePart = diceParts[i],
                                oneDiceType = dicePart.split('D');
                            if (oneDiceType.length === 2) {
                                var numberOfDice = Number(oneDiceType[0]),
                                    diceSize = Number(oneDiceType[1]),
                                    rolledDice;
                                for (rolledDice = 0; rolledDice < numberOfDice; rolledDice += 1) {
                                    sum += Math.floor((Math.random() * diceSize) + 1);
                                }
                            } else if (dicePart.indexOf('+') === 0) {
                                sum += Number(dicePart.substr(1, dicePart.length - 1));
                            } else if (dicePart.indexOf('-') === 0) {
                                sum -= Number(dicePart.substr(1, dicePart.length - 1));
                            } else {
                                console.error('could not calc dice roll:' + $element.attr('dice'));
                                result = -1;
                                break;
                            }
                        }
                        result = sum;
                    },
                    hideOrShow = function () {
                        if ((forceShow || hoverShow) && result !== -1) {
                            $scope.result = result;
                        } else {
                            $scope.result = '';
                        }
                    };

                $scope.theClick = function () {
                    rollDice();
                    forceShow = true;
                    hideOrShow();
                    if ($element.attr('reroll') === undefined || $element.attr('reroll') === 'true') {
                        var oldClass = $scope.diceClass;
                        while (oldClass === $scope.diceClass) {
                            $scope.diceClass = diceClasses[Math.floor(Math.random() * diceClasses.length)];
                        }
                    }

                    $timeout.cancel(timeout);
                    if ($element.attr('persist') === undefined || $element.attr('persist') === 'false') {
                        timeout = $timeout(function () {
                            forceShow = false;
                            hideOrShow();
                        }, showTime);
                    }
                };

                $scope.theEnter = function () {
                    hoverShow = true;
                    hideOrShow();
                };
                $scope.theLeave = function () {
                    hoverShow = false;
                    hideOrShow();
                };
                $scope.$on('desctroy', function (event) {
                    $timeout.cancel(timeout);
                });
            },
            link: function postLink(scope, element, attrs) {

            }
        };
    }]);
