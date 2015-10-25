'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogPlaceDetailsCtrl',
        ['$scope', '$mdDialog', 'AuthAdminService', 'DialogService', 'NotificationService', 'feature', 'TIP',
        function ($scope, $mdDialog, AuthAdminService, DialogService, NotificationService, feature, TIP) {
            console.log(feature);
            $scope.isAuthenticated = function () {
                return AuthAdminService.isAuthenticated;
            };

            $scope.types = [
                {id: "M", name: "Monument"},
                {id: "NS", name: "Natural Space"},
                {id: "H", name: "Hotel"},
                {id: "R", name: "Restaurant"}
            ];

            $scope.feature = TIP.get({id:feature.id});
            $scope.updatedFeature = angular.copy(feature);

            $scope.edit = false;
            $scope.enableEdit = function () {
                $scope.edit = true;
            };

            $scope.disableEdit = function () {
                $scope.updatedFeature = angular.copy($scope.feature);
                $scope.edit = false;
            };

            $scope.formValidAndDirty = function (form) {
                return (angular.isDefined(form) && form.$valid && form.$dirty);
            };

            $scope.saveChanges = function () {
                console.log($scope);
                //$scope.updatedFeature.photoContent = $scope.photo.$ngfDataUrl;
                //$scope.updatedFeature.photoName = $scope.photo.name;
                var parameters = {id:$scope.updatedFeature.id},
                    patchPayload = _.pick($scope.updatedFeature,'type','name','description','infoUrl','address',
                                                                'photoUrl','photoContent','photoName');
                TIP.patch(parameters,patchPayload).$promise
                    .then(function(){
                        var updated = angular.copy($scope.updatedFeature);
                        $scope.feature = updated;
                        feature = updated;
                        $scope.disableEdit();
                        NotificationService.displayMessage("Place updated!");
                    }, function(){
                        NotificationService.displayMessage("Error updating place");
                    });
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
