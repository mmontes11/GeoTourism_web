'use strict';

define([
    '../module'
], function(module){

    module.controller('ConfigAdminCtrl',['$scope','Admin','FeatureService','DialogService','NotificationService',
        function($scope,Admin,FeatureService,DialogService,NotificationService){

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

        $scope.toggleEditBBox = function(){
            $scope.editBBox = !$scope.editBBox;
        };
        var getBBoxJSON = function(BBoxWKT){
            return {
                geom: BBoxWKT
            };
        };
        $scope.updateBBox = function(){
            var BBoxJSON = getBBoxJSON(FeatureService.layer2WKT($scope.areaselected));
            Admin.updateBBox(BBoxJSON).$promise
                .then(function(){
                    $scope.bboxfeature = BBoxJSON;
                });
        };
        Admin.getBBox().$promise
            .then(function(bbox){{
                $scope.bboxfeature = bbox;
            }});


        Admin.getUnreviewedTIPs().$promise
            .then(function(tips){
                $scope.tips = tips;
            });
        $scope.bounceTIP = function(TIPId){
            $scope.bounce = TIPId;
        };
        $scope.stopBouncing = function(){
            $scope.$broadcast("map.stopbouncing",true);
        };
        $scope.reviewPlaces = function(places){
            console.log("REVIEW PLACES");
            console.log(places);
        };
        $scope.deletePlaces = function(places){
            console.log("DELETE PLACES");
            console.log(places);
        };


        $scope.osmtypes = Admin.getOSMTypes();
        $scope.addType = function(){
            DialogService.showPlaceTypeDialog()
                .then(function(placeType){
                    var payload = _.pick(placeType,"name","icon","osmType");
                    Admin.createOSMType(payload).$promise
                        .then(function(){
                            NotificationService.displayMessage("Type Created");
                            $scope.osmtypes = Admin.getOSMTypes();
                        }, function(){
                            NotificationService.displayMessage("Error creating Type");
                        });
                });
        };
        $scope.editType = function(osmType){
            console.log(osmType);
            var placeType = {
                id: osmType.id,
                name: osmType.tipType.name,
                icon: osmType.tipType.icon,
                osmKey: osmType.key,
                osmType: osmType.value
            };
            DialogService.showPlaceTypeDialog(placeType)
                .then(function(placeType){
                    var params = _.pick(placeType,"id","name","icon","osmType");
                    console.log(placeType);
                    console.log(params);
                    Admin.updateOSMType(params).$promise
                        .then(function(){
                            NotificationService.displayMessage("Type Updated");
                            $scope.osmtypes = Admin.getOSMTypes();
                        }, function(){
                            NotificationService.displayMessage("Error updating Type");
                        });
                });
        };
        $scope.deleteTypes = function(types){
            console.log("DELETE TYPES");
            console.log(types);
        };
    }]);
});