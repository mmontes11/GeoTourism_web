'use strict';

define([
    '../module'
], function (module) {
    module.controller('PlacesCtrl', ['$scope', '$mdDialog', 'LocationService', 'TIPsService',
        function ($scope, $mdDialog, LocationService, TIPsService) {

            LocationService.getCurrentLocation()
                .then(function (location) {

                    var locationStr = LocationService.getLocationString(location.coords.longitude, location.coords.latitude);
                    $scope.data = {
                        userLocation: {
                            longitude: location.coords.longitude,
                            latitude: location.coords.latitude
                        },
                        features: TIPsService.query({location: locationStr})
                    };
                });
        }]);
});