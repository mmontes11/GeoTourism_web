define([
    '../module'
], function (module) {
    module.controller('MainLayoutCtrl', ['$scope', '$window', '$timeout', 'Admin', 'AuthAdminService',
        function ($scope, $window, $timeout, Admin, AuthAdminService) {
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
