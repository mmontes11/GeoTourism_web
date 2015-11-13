define([
    '../module'
], function (module) {

    module.controller('MainLayoutCtrl', ['$scope', 'AuthAdminService', 'LogInAdminService', 'AuthFBService',
        function ($scope, AuthAdminService, LogInAdminService, AuthFBService) {

            $scope.isAuthAdmin = function () {
                return AuthAdminService.isAuthenticated;
            };

            $scope.logOut = function () {
                LogInAdminService.logOut();
            };

            $scope.isAuthFB = function(){
                return AuthFBService.isAuthFB;
            };
        }]);
});
