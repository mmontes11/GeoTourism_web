define([
    '../module'
], function (module) {

    module.controller('MainLayoutCtrl', ['$scope', 'Admin', 'AuthAdminService',
        function ($scope, Admin, AuthAdminService) {

            $scope.isAuthAdmin = function () {
                return AuthAdminService.isAuthenticated;
            };
            $scope.logOut = function () {
                AuthAdminService.logOut();
            };
            if ($scope.isAuthAdmin()){
                Admin.validateToken();
            }
        }]);
});
