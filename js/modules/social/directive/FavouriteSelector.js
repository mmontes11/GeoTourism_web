'use strict';

define([
    '../module'
], function (module) {
    module.directive('favouriteSelector', function(){
        return {
            restrict: 'E',
            templateUrl: 'partials/social/favouriteSelector.html',
            scope: {
                favouritedBy: '='
            },
            link: function(scope) {
                scope.people = [
                    {
                        value: 0,
                        text: "Me"
                    },
                    {
                        value: 1,
                        text: "My Friends"
                    }
                ];

                scope.$watch('favouritedBy',function(a){
                    console.log(a);
                });
            }
        };
    });
});