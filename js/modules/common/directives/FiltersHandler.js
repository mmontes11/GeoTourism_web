'use strict';

define([
    '../module'
], function (module) {
    module.directive('filtersHandler', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/common/filtersHandler.html',
            scope: {
                filtersEnabled: "="
            },
            link: function(scope){
                scope.toggleFilters = function(){
                    scope.filtersEnabled = !scope.filtersEnabled;
                };
            }
        };
    });
});
