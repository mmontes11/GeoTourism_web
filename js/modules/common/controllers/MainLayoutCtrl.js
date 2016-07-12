define([
    '../module'
], function (module) {
    module.controller('MainLayoutCtrl', ['$scope', '$mdDialog', '$mdSidenav', '$mdMedia', '$state','Admin', 'AuthAdminService',
        function ($scope, $mdDialog, $mdSidenav, $mdMedia, $state, Admin, AuthAdminService) {
            $scope.isAuthAdmin = function () {
                return AuthAdminService.isAuthenticated;
            };
            $scope.logOut = function () {
                AuthAdminService.logOut();
                if ($state.is('adminConfig')){
                    $state.go('adminLogIn');
                }
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

            $scope.$watch('isMobile()',function(newValue){
                if (angular.isDefined(newValue) && newValue){
                }
            });
        }]);
});
