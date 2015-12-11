'use strict';

define([
    '../module'
], function (module) {
    module.directive('starRating', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/social/rating.html',
            scope: {
                rating: '=',
                max: '=?',
                onRatingSelect: '&?',
                readonly: '=?'
            },
            link: function(scope, element, attributes) {
                if (scope.max == undefined) {
                    scope.max = 5;
                }
                function updateStars() {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.rating
                        });
                    }
                };
                scope.toggle = function(index) {
                    if (scope.readonly == undefined || scope.readonly === false){
                        scope.rating = index + 1;
                        scope.onRatingSelect({
                            rating: index + 1
                        });
                    }
                };
                scope.$watch('rating', function(oldValue, newValue) {
                    if (angular.isDefined(newValue)) {
                        updateStars();
                    }
                });
            }
        };
    })
});