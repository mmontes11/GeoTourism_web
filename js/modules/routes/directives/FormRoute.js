'use strict';

define([
    '../module'
], function (module) {
    module.directive('formRoute', ['$rootScope', function ($rootScope) {
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

                scope.addPlaces = function(){
                    var eventData = {
                        route: scope.route
                    };
                    $rootScope.$broadcast("Route.AddPlaces",eventData);
                };

                scope.resetPlaces = function () {
                    scope.route.tips = angular.copy(scope.tipsCopy);
                };

                scope.$watchCollection('route.tips', function (newVal, oldVal) {
                    if (scope.tipsCopy == undefined && oldVal != undefined && !_.isEmpty(oldVal)){
                        scope.tipsCopy = angular.copy(oldVal);
                    }
                    if (newVal != undefined && (newVal.$promise == undefined || (newVal.$promise && newVal.$resolved))) {
                        if (scope.tipsCopy != undefined){
                            scope.tipschanged = !sameArrays(newVal, scope.tipsCopy);
                        }
                    }
                });

                scope.$watch('route.travelMode', function (newVal, oldVal) {
                    scope.travelmodechanged = (oldVal != undefined && newVal != undefined && newVal != initialTravelMode);
                });
            }
        };
    }]);
});