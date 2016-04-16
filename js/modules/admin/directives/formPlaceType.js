'use strict';

define([
    '../module'
], function (module) {
    module.directive("formPlaceType", ["Admin",function(Admin){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/admin/formPlaceType.html',
            scope: {
                placetype: "=",
                form: "="
            },
            link: function(scope){
                scope.osmKeys = Admin.getOSMKeys();
                scope.$watch("placetype.osmKey", function(newValue){
                    if (angular.isDefined(newValue)){
                        console.log(newValue)
                        scope.osmTypes = Admin.getOSMTypeValues({osmKey:newValue});
                    }
                });
            }
        };
    }]);
});