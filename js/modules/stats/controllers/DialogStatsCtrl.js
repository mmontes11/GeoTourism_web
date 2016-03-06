'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogStatsCtrl',['$scope','$mdDialog','Stats',function($scope,$mdDialog,Stats){
        $scope.close = function(){
            $mdDialog.cancel();
        };
        $scope.accept = function(){
            var statsResponse = {
                metricID: $scope.metricID
            };
            $mdDialog.hide(statsResponse);
        };
        $scope.metrics = Stats.getMetrics();
    }]);
});