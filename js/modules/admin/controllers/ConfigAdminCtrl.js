'use strict';

define([
    '../module'
], function(module){

    module.controller('ConfigAdminCtrl',['$scope','Admin','FeatureService', function($scope,Admin,FeatureService){

        $scope.editBBox = false;

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
    }]);
});