'use strict';

define([
    '../module'
], function (module) {
    module.controller('RoutesCtrl',['$scope',function($scope){

        var requestFeatures = function () {
            var types = _.map($scope.selectedTypes, function (type) {
                return type.id;
            });
            var cities = _.map($scope.selectedCities, function (city) {
                return city.id;
            });
            var URLparams = {
                bounds: $scope.bounds,
                types: types,
                cities: cities
            };
            if ($scope.isAuthFB()){
                URLparams["favouritedBy"] = $scope.favouritedBy;
                URLparams["facebookUserId"] = FBStorageService.getUserID();
                if (angular.isDefined($scope.favouritedBy) && $scope.favouritedBy == 1 && !_.isEmpty($scope.selectedFriends)) {
                    URLparams["friends"] = _.map($scope.selectedFriends, function (friend) {
                        return friend.facebookUserId;
                    });
                }
            }else{
                URLparams["favouritedBy"] = undefined;
                URLparams["facebookUserId"] = undefined;
                URLparams["friends"] = undefined;
            }

            TIPs.query(URLparams).$promise
                .then(function (resultFeatures) {
                    $scope.features = resultFeatures;
                }, function () {
                    NotificationService.displayMessage("Error retrieving TIPS")
                });
        };

        $scope.$watch('boundschanged', function (bounds, boundsOld) {
            if (angular.isDefined(bounds) && angular.isDefined(boundsOld)) {
                $scope.bounds = FeatureService.toWKT(bounds);
                requestFeatures();
            }
        });
    }]);
});