define([
    '../module'
], function (module) {

    module.controller('MainLayoutCtrl', ['$scope', 'AuthAdminService', 'LogInAdminService',
        function ($scope, AuthAdminService, LogInAdminService) {

            $scope.isAuthAdmin = function () {
                return AuthAdminService.isAuthenticated;
            };

            $scope.logOut = function () {
                LogInAdminService.logOut();
            };
        }]);
});
