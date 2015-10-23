'use strict';

define([
    '../module'
], function(module){
    module.controller('DialogPlaceDetailsCtrl',['$scope','$mdDialog','AuthAdminService','DialogService','feature',
        function($scope,$mdDialog,AuthAdminService,DialogService,feature){

        $scope.isAuthenticated = function(){
            return AuthAdminService.isAuthenticated;
        };

        $scope.feature = feature;
            

        $scope.delete = function(){
            $mdDialog.hide("Delete");
        };

        $scope.close = function() {
            $mdDialog.cancel();
        };

    }]);
});
