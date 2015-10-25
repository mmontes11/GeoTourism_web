'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogPlaceDetailsCtrl', ['$scope', '$mdDialog', 'AuthAdminService', 'DialogService', 'feature',
        function ($scope, $mdDialog, AuthAdminService, DialogService, feature) {

            $scope.isAuthenticated = function () {
                return AuthAdminService.isAuthenticated;
            };

            $scope.types = [
                {id: "M", name: "Monument"},
                {id: "NS", name: "Natural Space"},
                {id: "H", name: "Hotel"},
                {id: "R", name: "Restaurant"}
            ];

            $scope.feature = feature;

            $scope.edit = false;
            $scope.enableEdit = function () {
                $scope.edit = true;
            };

            $scope.saveChanges = function(){
                $scope.disableEdit();
            };

            $scope.disableEdit = function () {
                $scope.edit = false;
            };

            $scope.delete = function () {
                $mdDialog.hide("Delete");
            };

            $scope.close = function () {
                $scope.disableEdit();
                $mdDialog.cancel();
            };

        }]);
});
