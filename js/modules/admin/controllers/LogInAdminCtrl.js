'use strict';

define([
   '../module'
], function(module){

    module.controller('LogInAdminCtrl',['$scope','$state','BrowserService','LogInAdminService','AuthAdminService','NotificationService',
        function($scope,$state,BrowserService,LogInAdminService,AuthAdminService,NotificationService){

        $scope.logIn = function() {
            LogInAdminService.logIn($scope.username,$scope.password)
                .then(function(response){
                    BrowserService.setSession("token",response.data.token);
                    AuthAdminService.isAuthenticated = true;
                    $state.go('places');
                    NotificationService.displayMessage('Logged as Admin!');
                }, function(response){
                    NotificationService.displayMessage('Invalid Credentials!');
                });
        };
    }]);
});