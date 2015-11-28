'use strict';

define([
    '../module'
], function (module) {
    module.directive('favourite', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/social/favourite.html',
            scope: {
                favourited: "="
            },
            link: function(scope, elem) {
                elem.bind('click', function() {
                    scope.$apply(function(){
                        scope.favourited = !scope.favourited;
                    });
                });
            }
        };
    })
});