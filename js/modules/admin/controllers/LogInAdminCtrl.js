'use strict';

define([
   '../module'
], function(module){

    module.controller('LogInAdminCtrl',['$scope','$state','$mdToast','LogInAdminService','BrowserService','AuthAdminService','Config',
        function($scope,$state,$mdToast,LogInAdminService,BrowserService,AuthAdminService,Config){

        $scope.logIn = function() {
            LogInAdminService.login($scope.username,$scope.password)
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
                    AuthAdminService.isAuthenticated = true;
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