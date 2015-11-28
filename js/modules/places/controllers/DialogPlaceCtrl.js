'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogPlaceCtrl',
        ['$scope', '$mdDialog', 'AuthAdminService', 'DialogService', 'NotificationService', 'feature', 'TIP', 'AuthFBService',
            function ($scope, $mdDialog, AuthAdminService, DialogService, NotificationService, feature, TIP, AuthFBService) {

                $scope.isAuthenticated = function () {
                    return AuthAdminService.isAuthenticated;
                };
                $scope.isAuthFB = function(){
                    return AuthFBService.isAuthFB;
                };

                $scope.types = TIP.getTypes();

                TIP.get({id: feature.id}).$promise
                    .then(function (feature) {
                        $scope.feature = feature;
                        $scope.copy = angular.copy(feature);
                    }, function (response) {
                        if (response.status != 401) {
                            if (response.status === 404) {
                                NotificationService.displayMessage("Place not found");
                            } else {
                                NotificationService.displayMessage("Error retrieving place");
                            }
                        }
                        $scope.close();
                    });

                $scope.edit = false;
                $scope.enableEdit = function () {
                    $scope.edit = true;
                };

                $scope.disableEdit = function (reset) {
                    if (reset) {
                        $scope.feature = angular.copy($scope.copy);
                    }
                    $scope.edit = false;
                };

                $scope.formValidAndDirty = function (form) {
                    return (angular.isDefined(form) && form.$valid && form.$dirty);
                };

                $scope.saveChanges = function () {

                    if (angular.isDefined($scope.feature.photo)) {
                        $scope.feature.photoContent = $scope.feature.photo.$ngfDataUrl;
                        $scope.feature.photoName = $scope.feature.photo.name;
                    }

                    var parameters = {id: $scope.feature.id},
                        patchPayload = _.pick($scope.feature, 'type', 'name', 'description', 'infoUrl', 'address',
                            'photoUrl', 'photoContent', 'photoName');
                    TIP.patch(parameters, patchPayload).$promise
                        .then(function (feature) {
                            $scope.feature = feature;
                            $scope.copy = angular.copy(feature);
                            $scope.disableEdit(false);
                            NotificationService.displayMessage("Place updated!");
                        }, function (response) {
                            if (response.status != 401) {
                                NotificationService.displayMessage("Error updating place");
                            }
                            $scope.close();
                        });
                };

                $scope.delete = function () {
                    $mdDialog.hide("Delete");
                };

                $scope.close = function () {
                    $scope.disableEdit();
                    $mdDialog.cancel();
                };

                $scope.$watch('feature.type',function(typeID){
                    if (angular.isDefined(typeID)){
                        $scope.type = TIP.getTypeName({type:typeID});
                    }
                });

                $scope.$watch('feature.myFavourite',function(favourite){
                    if (_.isBoolean(favourite)){
                        console.log(favourite)
                    }
                });
            }]);
});
