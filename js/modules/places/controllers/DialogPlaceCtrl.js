'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogPlaceCtrl',
        ['$scope', '$mdDialog', 'AuthAdminService', 'DialogService', 'NotificationService', 'feature', 'TIP', 'AuthFBService', 'FBStorageService',
            function ($scope, $mdDialog, AuthAdminService, DialogService, NotificationService, feature, TIP, AuthFBService, FBStorageService) {

                $scope.isAuthenticated = function () {
                    return AuthAdminService.isAuthenticated;
                };
                $scope.isAuthFB = function () {
                    return AuthFBService.isAuthFB;
                };

                $scope.types = TIP.getTypes();

                var facebookUserId = $scope.isAuthFB() && FBStorageService.getUserID()? FBStorageService.getUserID() : undefined;
                TIP.get({
                    id: feature.id,
                    facebookUserId: facebookUserId
                }).$promise
                    .then(function (tip) {
                        $scope.tip = tip;
                        $scope.copy = angular.copy(tip);
                    }, function (response) {
                        if (response.status === 404) {
                            NotificationService.displayMessage("Place not found");
                        }
                        $scope.close();
                    });

                $scope.edit = false;
                $scope.enableEdit = function () {
                    $scope.edit = true;
                };

                $scope.disableEdit = function (reset) {
                    if (reset) {
                        $scope.tip = angular.copy($scope.copy);
                    }
                    $scope.edit = false;
                };

                $scope.formValidAndDirty = function (form) {
                    return (angular.isDefined(form) && form.$valid && form.$dirty);
                };

                $scope.saveChanges = function () {

                    if (angular.isDefined($scope.tip.photo)) {
                        $scope.tip.photoContent = $scope.tip.photo.$ngfDataUrl;
                        $scope.tip.photoName = $scope.tip.photo.name;
                    }

                    var parameters = {id: $scope.tip.id},
                        patchPayload = _.pick($scope.tip, 'type', 'name', 'description', 'infoUrl', 'address',
                            'photoUrl', 'photoContent', 'photoName');
                    TIP.patch(parameters, patchPayload).$promise
                        .then(function (tip) {
                            $scope.tip = tip;
                            $scope.copy = angular.copy(tip);
                            $scope.disableEdit(false);
                            NotificationService.displayMessage("Place updated!");
                        }, function (response) {
                            if (response.status == 500) {
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

                $scope.$watch('tip.type', function (typeID) {
                    if (angular.isDefined(typeID)) {
                        $scope.type = TIP.getTypeName({type: typeID});
                    }
                });

                $scope.$watch('tip.myFavourite', function (favourite,favouriteOld) {
                    if (angular.isDefined(favourite) && angular.isDefined(favouriteOld) && _.isBoolean(favourite)) {
                        TIP.favourite({
                            id: feature.id,
                            facebookUserId: FBStorageService.getUserID(),
                            favouriteValue: favourite
                        }).$promise.then(function(response){
                                $scope.tip.favouritedBy = response;
                        });
                    }
                });

                $scope.averageRate = 0;
                $scope.$watch('tip.averageRate', function (newVal) {
                    $scope.averageRate = Math.round(parseFloat(newVal));
                });

                $scope.myRate = 0;
                $scope.$watch('tip.myRate', function(newVal){
                    $scope.myRate = Math.round(parseFloat(newVal));
                });

                $scope.rateSelected = function(ratingValue) {
                    TIP.rate({
                        id: feature.id,
                        facebookUserId: FBStorageService.getUserID(),
                        ratingValue: ratingValue
                    }).$promise.then(function(response){
                            $scope.averageRate = Math.round(parseFloat(response.averageRate));
                    });
                };
            }]);
});
