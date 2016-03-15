'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogStatsCtrl', ['$scope', '$mdDialog', 'Stats','DateService',
        function ($scope, $mdDialog, Stats, DateService) {
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
                var fromDate;
                var toDate;
                if ($scope.dateID == 1){
                    var dates = DateService.getFromToLastWeek();
                    fromDate = dates.fromDate;
                    toDate = dates.toDate;
                }
                if ($scope.dateID == 2){
                    var dates = DateService.getFromToLasMonth();
                    fromDate = dates.fromDate;
                    toDate = dates.toDate;
                }
                if ($scope.dateID == 3){
                    if (angular.isDefined($scope.fromDate)){
                        fromDate = DateService.formatDate($scope.fromDate);
                    }
                    if (angular.isDefined($scope.toDate)){
                        toDate = DateService.formatDate($scope.toDate);
                    }
                }
                var statsResponse = {
                    metricID: $scope.metricID,
                    dateID : $scope.dateID,
                    fromDate: fromDate,
                    toDate: toDate
                };
                $mdDialog.hide(statsResponse);
            };
            $scope.clearDate = function(){
                $scope.dateID = undefined;
                $scope.fromDate = undefined;
                $scope.toDate = undefined;
            };
        }]);
});