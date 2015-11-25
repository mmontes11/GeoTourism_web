'use strict';

define([
   '../module'
], function(module){

    module.controller('LogInAdminCtrl',['$scope','$state','BrowserService','LogInAdminService','AuthAdminService','NotificationService',
        function($scope,$state,BrowserService,LogInAdminService,AuthAdminService,NotificationService){

        $scope.logIn = function() {
            LogInAdminService.logIn($scope.username,$scope.password)
                .then(function(response){
                    BrowserService.setStorage("token",response.data.token);
                    AuthAdminService.isAuthenticated = true;
                    $state.go('places');
                    NotificationService.displayMessage('You are now Admin!');
                }, function(){
                    NotificationService.displayMessage('Invalid Credentials');
                });
        };
    }]);
});