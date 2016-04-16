'use strict';

define([
    '../module'
], function(module){

    module.controller('ConfigAdminCtrl',['$scope','Admin','FeatureService','DialogService',function($scope,Admin,FeatureService,DialogService){

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
            DialogService.showPlaceTypeDialog({})
                .then(function(placeType){
                    console.log(placeType);
                }, function(){

                });
        };
        $scope.editType = function(type){
            console.log("EDIT TYPE");
            console.log(type);
        };
        $scope.deleteTypes = function(types){
            console.log("DELETE TYPES");
            console.log(types);
        };
    }]);
});