'use strict';

define([
    '../module'
], function (module) {
    module.directive("uniqueOsmType", ["$q","Admin", function ($q,Admin) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.uniqueOSMtype = function(osmType){
                    if (angular.isDefined(osmType)){
                        var params = {
                            osmType: osmType
                        };
                        return Admin.checkOSMType(params).$promise;
                    } else{
                        return $q.resolve();
                    }
                };
            }
        };
    }]);
});