'use strict';

define([
   '../module'
], function(module){

    module.controller('LogInAdminCtrl',['$scope','$state','$mdToast','BrowserService','AuthAdminService','Config',
        function($scope,$state,$mdToast,BrowserService,AuthAdminService,Config){

        $scope.logIn = function() {
            AuthAdminService.login($scope.username,$scope.password)
                .then(function(response){
                    AuthAdminService.isAuthenticated = true;
                    BrowserService.setSession("token",response.data.token);
                    $state.go('adminPlaces');
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Logged as Admin!')
                            .position('top right')
                            .hideDelay(Config.TOAST_TIMEOUT)
                    );
                }, function(response){
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Invalid Credentials!')
                            .position('top right')
                            .hideDelay(Config.TOAST_TIMEOUT)
                    );
                });
        };
    }]);
});