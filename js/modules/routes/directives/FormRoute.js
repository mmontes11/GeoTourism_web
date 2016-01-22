'use strict';

define([
    '../module'
], function (module) {
    module.directive('formRoute', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/routes/formRoute.html',
            scope: {
                form: '=',
                route: "=",
                tips: "=",
                travelmodes: '='
            },
            link: function(scope, element, attrs){
                scope.route = scope.route || {};

                scope.removePlace = function(tip){
                    var index = scope.tips.indexOf(tip);
                    if (index > -1){
                        scope.tips.splice(index,1);
                    }
                };
            }
        };
    });
});