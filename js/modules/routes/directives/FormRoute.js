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
                travelmodes: '='
            },
            link: function(scope, element, attrs){
                scope.route = scope.route || {};

            }
        };
    });
});