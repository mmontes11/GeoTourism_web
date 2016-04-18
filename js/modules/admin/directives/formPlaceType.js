'use strict';

define([
    '../module'
], function (module) {
    module.directive("formPlaceType", ["Admin", function (Admin) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/admin/formPlaceType.html',
            scope: {
                placetype: "=",
                form: "="
            },
            link: function (scope) {
                scope.osmKeys = Admin.getOSMKeys();
                scope.showOSMtype = function(){
                    return (scope.placetype.osmKey != undefined && scope.osmTypes != undefined && scope.osmTypes.length > 0);
                };
                scope.showDeleteOSMtype = function(){
                    return (scope.placetype.osmKey != undefined || scope.placetype.osmType != undefined);
                };
                scope.deleteOSMtype = function(){
                    scope.placetype.osmKey = undefined;
                    scope.placetype.osmType = undefined;
                };
                scope.$watch("placetype.osmKey", function (osmKey) {
                    if (angular.isDefined(osmKey)) {
                        scope.osmTypes = Admin.getOSMTypeValues({osmKey: osmKey});
                    }
                });
            }
        };
    }]);
});