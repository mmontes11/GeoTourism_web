'use strict';

define([
    '../module'
], function (module) {
    module.directive('formRoute', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/routes/formRoute.html',
            scope: {
                form: '=',
                route: "=",
                travelmodes: '=',
                travelmodechanged: '=',
                tipschanged: '='
            },
            link: function (scope) {
                scope.route = scope.route || {};
                scope.tipschanged = false;
                scope.travelmodechanged = false;
                var initialTravelMode = angular.copy(scope.route.travelMode);

                scope.removePlace = function (tip) {
                    var index = scope.route.tips.indexOf(tip);
                    if (index > -1) {
                        scope.route.tips.splice(index, 1);
                    }
                };

                var sameArrays = function (array1, array2) {
                    if (array1 == undefined && array2 == undefined) {
                        return true;
                    } else {
                        if (array1 == undefined || array2 == undefined) {
                            return false;
                        }
                    }
                    if (array1.length != array2.length) {
                        return false;
                    }
                    for (var i = 0; i < array1.length; i++) {
                        if (array1[i].id != array2[i].id) {
                            return false;
                        }
                    }
                    return true;
                };

                scope.resetPlaces = function () {
                    scope.route.tips = angular.copy(scope.tipsCopy);
                };

                scope.$watchCollection('route.tips', function (newVal, oldVal) {
                    if (newVal != undefined && (newVal.$promise == undefined || (newVal.$promise && newVal.$promise.$resolved))){
                        if (scope.tipsCopy == undefined) {
                            scope.tipsCopy = angular.copy(oldVal);
                        } else {
                            scope.tipschanged = !sameArrays(newVal, scope.tipsCopy);
                        }
                    }
                });

                scope.$watch('route.travelMode', function (newVal,oldVal) {
                    scope.travelmodechanged = (oldVal != undefined && newVal != undefined && newVal != initialTravelMode);
                });
            }
        };
    });
});