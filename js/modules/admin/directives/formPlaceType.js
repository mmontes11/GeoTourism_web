'use strict';

define([
    '../module'
], function (module) {
    module.directive("formPlaceType", function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/admin/formPlaceType.html',
            scope: {
                placetype: "=",
                form: "="
            },
            link: function(scope){

            }
        };
    });
});