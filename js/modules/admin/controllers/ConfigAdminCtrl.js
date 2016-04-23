'use strict';

define([
    '../module'
], function (module) {

    module.controller('ConfigAdminCtrl', ['$scope', '$q', 'Admin', 'TIP', 'FeatureService', 'DialogService', 'NotificationService',
        function ($scope, $q, Admin, TIP, FeatureService, DialogService, NotificationService) {

            $scope.editBBox = false;
            $scope.selectedReview = [];
            $scope.selectedTypes = [];
            $scope.queryReview = {
                order: 'id',
                limit: 5,
                page: 1
            };
            $scope.queryTypes = {
                order: 'id',
                limit: 5,
                page: 1
            };

            $scope.toggleEditBBox = function () {
                $scope.editBBox = !$scope.editBBox;
            };
            var getBBoxJSON = function (BBoxWKT) {
                return {
                    geom: BBoxWKT
                };
            };
            $scope.updateBBox = function () {
                var BBoxJSON = getBBoxJSON(FeatureService.layer2WKT($scope.areaselected));
                Admin.updateBBox(BBoxJSON).$promise
                    .then(function () {
                        $scope.bboxfeature = BBoxJSON;
                    });
            };
            Admin.getBBox().$promise
                .then(function (bbox) {
                    {
                        $scope.bboxfeature = bbox;
                    }
                });


            Admin.getUnreviewedTIPs().$promise
                .then(function (tips) {
                    $scope.tips = tips;
                });
            $scope.bounceTIP = function (TIPId) {
                $scope.bounce = TIPId;
            };
            $scope.stopBouncing = function () {
                $scope.$broadcast("map.stopbouncing", true);
            };
            $scope.reviewPlaces = function (places) {
                DialogService.showConfirmDialog("Review Places?", "Do you want to review this " + places.length + " places/s?", "Yes", "Cancel")
                    .then(function () {
                        var promises = _.map(places, function (place) {
                            return TIP.review({id: place.id}).$promise;
                        });
                        $q.all(promises)
                            .then(function(){
                                NotificationService.displayMessage("Places reviewed");
                                Admin.getUnreviewedTIPs().$promise
                                    .then(function (tips) {
                                        $scope.tips = tips;
                                    });
                            }, function(){
                                NotificationService.displayMessage("Error reviewing Places");
                            });
                    });
                resetUnreviewedPlaces();
            };
            $scope.deletePlaces = function (places) {
                DialogService.showConfirmDialog("Delete Places?", "Do you want to delete this " + places.length + " places/s?", "Yes", "Cancel")
                    .then(function () {
                        var promises = _.map(places, function (place) {
                            return TIP.delete({id: place.id}).$promise;
                        });
                        $q.all(promises)
                            .then(function(){
                                NotificationService.displayMessage("Places deleted");
                                Admin.getUnreviewedTIPs().$promise
                                    .then(function (tips) {
                                        $scope.tips = tips;
                                    });
                            }, function(){
                                NotificationService.displayMessage("Error deleting Places");
                            });
                    });
                resetUnreviewedPlaces();
            };
            var resetUnreviewedPlaces = function(){
                $scope.selectedReview = [];
            };


            $scope.placeTypes = TIP.getTypes();
            $scope.addType = function () {
                DialogService.showPlaceTypeDialog()
                    .then(function (placeType) {
                        TIP.createType(placeType).$promise
                            .then(function () {
                                NotificationService.displayMessage("Type Created");
                                $scope.placeTypes = TIP.getTypes();
                            }, function () {
                                NotificationService.displayMessage("Error creating Type");
                            });
                    });
            };
            $scope.editType = function (placeType) {
                var placeTypeCopy = angular.copy(placeType);
                DialogService.showPlaceTypeDialog(placeTypeCopy)
                    .then(function (placeType) {
                        var payload = _.pick(placeType, "name", "icon", "osmTypes");
                        payload.osmTypes = _.map(payload.osmTypes, function(osmType){
                            return _.pick(osmType,"key","value");
                        });
                        TIP.updateType({id: placeType.id}, payload).$promise
                            .then(function () {
                                NotificationService.displayMessage("Place Type updated");
                                $scope.placeTypes = TIP.getTypes();
                            }, function () {
                                NotificationService.displayMessage("Error updating Types");
                            });
                    });
                resetSelectedTypes();
            };
            $scope.deleteTypes = function (types) {
                DialogService.showConfirmDialog("Delete Place Types?", "Do you want to delete this " + types.length + " type/s?", "Yes", "Cancel")
                    .then(function () {
                        var promises = _.map(types, function (type) {
                            return TIP.deleteType({id: type.id}).$promise;
                        });
                        $q.all(promises)
                            .then(function () {
                                NotificationService.displayMessage("Place Types deleted");
                                $scope.placeTypes = TIP.getTypes();
                            }, function () {
                                NotificationService.displayMessage("Error deleting Place Types");
                            });
                    });
                resetSelectedTypes();
            };

            var resetSelectedTypes = function(){
                $scope.selectedTypes = [];
            };
        }]);
});