define([
    '../module'
], function(module){

    module.controller('MainLayoutCtrl', ['$scope','AuthAdminService', function($scope,AuthAdminService){

        $scope.isAuthenticated = function(){
            return AuthAdminService.isAuthenticated;
        };

        $scope.logOut = function(){
            AuthAdminService.logOut();
        };
    }]);
});
