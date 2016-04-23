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
                scope.placetype = scope.placetype || {};
                scope.placetype.osmTypes = scope.placetype.osmTypes || [];
                scope.selectedOSMtypes = [];
                scope.query = {
                    order: 'key',
                    limit: 5,
                    page: 1
                };
                scope.osmKeys = Admin.getOSMKeys();
                scope.addOSMtypeButtonDisabled = function(key,value){
                    var osmTypesFound = _.where(scope.placetype.osmTypes,{key:key,value:value});
                    return (key == undefined || value == undefined || osmTypesFound.length > 0);
                };
                scope.addOSMtype = function(key,value){
                    scope.placetype.osmTypes.push({
                        key: key,
                        value: value
                    });
                    scope.osmKey = undefined;
                    scope.osmTypeValue = undefined;
                };
                scope.deleteOSMtypes = function(selectedOSMtypes){
                    scope.placetype.osmTypes = _.difference(scope.placetype.osmTypes,selectedOSMtypes);
                    scope.selectedOSMtypes = [];
                };
                scope.$watch("osmKey", function (osmKey) {
                    if (angular.isDefined(osmKey)) {
                        scope.osmTypeValues = Admin.getOSMTypeValues({osmKey: osmKey});
                    }
                });
                scope.$watch("placetype.id", function(id){
                    console.log(id);
                    if (angular.isDefined(id)){
                        scope.placetype.osmTypes = Admin.getOSMTypes({id:id});
                    }
                });
            }
        };
    }]);
});