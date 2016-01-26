'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogPlaceCtrl',
        ['$scope', '$mdDialog', 'AuthAdminService', 'DialogService', 'NotificationService', 'feature', 'TIP', 'AuthFBService', 'FBStorageService',
            function ($scope, $mdDialog, AuthAdminService, DialogService, NotificationService, feature, TIP, AuthFBService,FBStorageService) {

                $scope.isAuthenticated = function () {
                    return AuthAdminService.isAuthenticated;
                };
                $scope.isAuthFB = function () {
                    return AuthFBService.isAuthFB;
                };
                $scope.types = TIP.getTypes();
                $scope.facebookUserId = FBStorageService.getUserID();

                TIP.get({
                    id: feature.id
                }).$promise.then(
                    function (tip) {
                        $scope.tip = tip;
                        $scope.copy = angular.copy(tip);
                    }, function (response) {
                        if (response.status === 404) {
                            NotificationService.displayMessage("Place not found");
                        }
                        if (response.status = 500){
                            NotificationService.displayMessage("Error retrieving Place")
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

                    var patchPayload = _.pick($scope.tip, 'type', 'name', 'description', 'infoUrl', 'address', 'photoUrl');
                    TIP.patch({id:$scope.tip.id}, patchPayload).$promise
                        .then(function (tip) {
                            $scope.tip = tip;
                            $scope.copy = angular.copy(tip);
                            $scope.disableEdit(false);
                            NotificationService.displayMessage("Place updated!");
                        }, function (response) {
                            if (response.status == 500) {
                                NotificationService.displayMessage("Error updating Place");
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
                            favouriteValue: favourite
                        }).$promise.then(function(response){
                            if (favourite == true){
                                NotificationService.displayMessage("Place favourited!");
                            }else{
                                NotificationService.displayMessage("Place unfavourited!");
                            }
                            $scope.tip.createdBy = response;
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
                        ratingValue: ratingValue
                    }).$promise.then(function(response){
                        NotificationService.displayMessage("Place rated!");
                        $scope.averageRate = Math.round(parseFloat(response.averageRate));
                    });
                };

                $scope.maxCommentSize = 300;

                $scope.addComment = function(commentText){
                    TIP.comment({
                        id: feature.id,
                        commentText: commentText
                    }).$promise.then(function(response){
                        NotificationService.displayMessage("Place commented!");
                        $scope.tip.comments = response;
                    });
                };

                $scope.deleteComment = function(commentId){
                    TIP.deleteComment({
                        id: feature.id,
                        commentId: commentId
                    }).$promise.then(function(response){
                        NotificationService.displayMessage("Comment deleted!");
                        $scope.tip.comments = response;
                    });
                };
            }]);
});
