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
                tips: "=",
                travelmodes: '=',
                tipschanged: '=',
                travelmodechanged: '='
            },
            link: function (scope, element, attrs) {
                scope.route = scope.route || {};
                scope.tipschanged = false;
                scope.travelmodechanged = false;
                var initialTravelMode = angular.copy(scope.route.travelMode);

                scope.removePlace = function (tip) {
                    var index = scope.tips.indexOf(tip);
                    if (index > -1) {
                        scope.tips.splice(index, 1);
                    }
                };

                var sameArrays = function(array1,array2){
                    if (array1 == undefined && array2 == undefined){
                        return true;
                    }else{
                        if (array1 == undefined || array2 == undefined){
                            return false;
                        }
                    }
                    if (array1.length != array2.length){
                        return false;
                    }
                    for (var i = 0; i<array1.length; i++){
                        if (array1[i].id != array2[i].id){
                            return false;
                        }
                    }
                    return true;
                };

                scope.tips.$promise.then(function (tips) {
                    scope.resetPlaces = function () {
                        scope.tips = angular.copy(scope.tipsCopy);
                    };
                    scope.$watchCollection('tips', function (newVal,oldVal) {
                        if (scope.tipsCopy == undefined) {
                            scope.tipsCopy = angular.copy(oldVal);
                        } else {
                            scope.tipschanged = !sameArrays(newVal,scope.tipsCopy);
                        }
                    });
                });

                scope.$watch('route.travelMode', function(newVal){
                    scope.travelmodechanged = (newVal != initialTravelMode);
                });
            }
        };
    });
});