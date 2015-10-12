define([
    '../module'
], function(module){

    module.controller('MainLayoutCtrl', ['$scope','AuthAdminService','LogInAdminService', function($scope,AuthAdminService,LogInAdminService){

        $scope.isAuthenticated = function(){
            return AuthAdminService.isAuthenticated;
        };

        $scope.logOut = function(){
            LogInAdminService.logOut();
        };
    }]);
});
