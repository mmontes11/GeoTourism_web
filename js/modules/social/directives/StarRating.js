'use strict';

define([
    '../module'
], function (module) {
    module.directive('starRating', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/social/starRating.html',
            scope: {
                ratingvalue: '=',
                max: '=?',
                onRatingSelect: '&?',
                readonly: '=?'
            },
            link: function(scope) {
                if (scope.max == undefined) {
                    scope.max = 5;
                }
                function updateStars() {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingvalue
                        });
                    }
                }
                scope.toggle = function(index) {
                    if (scope.readonly == undefined || scope.readonly === false){
                        scope.ratingvalue = index + 1;
                        scope.onRatingSelect({
                            ratingvalue: index + 1
                        });
                    }
                };
                scope.$watch('ratingvalue', function(oldValue, newValue) {
                    if (angular.isDefined(newValue)) {
                        updateStars();
                    }
                });
            }
        };
    })
});