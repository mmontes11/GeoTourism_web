'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogStatsCtrl', ['$scope', '$mdDialog', 'Stats', 'selectedMetricID',
        function ($scope, $mdDialog, Stats, selectedMetricID) {
            $scope.metricID = selectedMetricID;
            $scope.metrics = Stats.getMetrics();
            $scope.dates = [
                {
                    id: 1,
                    name: "Last Week"
                },
                {
                    id: 2,
                    name: "Last Month"
                },
                {
                    id: 3,
                    name: "Other"
                }
            ];
            $scope.close = function () {
                $mdDialog.cancel();
            };
            $scope.accept = function () {
                var statsResponse = {
                    metricID: $scope.metricID
                };
                $mdDialog.hide(statsResponse);
            };
            $scope.clearDate = function(){
                $scope.dateID = undefined;
                $scope.fromDate = undefined;
                $scope.toDate = undefined;
            };
            $scope.$watch("metricID",function(metricID){
                if (angular.isDefined(metricID)){
                    selectedMetricID = metricID;
                }
            });
        }]);
});