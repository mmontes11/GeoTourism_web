'use strict';

define([
   '../module'
], function(module){

    module.controller('LogInAdminCtrl',['$scope','$state','BrowserService','AuthAdminService','NotificationService',
        function($scope,$state,BrowserService,AuthAdminService,NotificationService){

        $scope.logIn = function() {
            AuthAdminService.logIn($scope.username,$scope.password).$promise
                .then(function(response){
                    BrowserService.setStorage("token",response.token);
                    AuthAdminService.isAuthenticated = true;
                    $state.go('adminConfig');
                    NotificationService.displayMessage('You are now Admin!');
                }, function(){
                    NotificationService.displayMessage('Invalid Credentials');
                });
        };
    }]);
});