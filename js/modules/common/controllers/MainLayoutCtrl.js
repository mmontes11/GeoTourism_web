define([
    '../module'
], function (module) {
    module.controller('MainLayoutCtrl', ['$scope', '$mdDialog', '$mdSidenav', '$mdMedia', 'Admin', 'AuthAdminService',
        function ($scope, $mdDialog, $mdSidenav, $mdMedia, Admin, AuthAdminService) {
            $scope.isAuthAdmin = function () {
                return AuthAdminService.isAuthenticated;
            };
            $scope.logOut = function () {
                AuthAdminService.logOut();
            };
            if ($scope.isAuthAdmin()){
                Admin.validateToken();
            }

            $scope.openMenu = function($mdOpenMenu, ev) {
                $mdOpenMenu(ev);
            };

            $scope.isMobile = function(){
                return !$mdMedia('gt-sm');
            };

            $scope.openSideNav = function(){
                $mdSidenav('sidenav').toggle();
            };
        }]);
});
