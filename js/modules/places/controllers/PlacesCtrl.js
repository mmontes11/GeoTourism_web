'use strict';

define([
    '../module',
    'leaflet'
], function(module,L){
    module.controller('PlacesCtrl',['$scope', '$mdDialog', 'LocationService', 'Config', function ($scope, $mdDialog, LocationService, Config) {

        LocationService.getCurrentLocation()
            .then(function (location) {

                $scope.latitude = location.coords.latitude;
                $scope.longitude = location.coords.longitude;
                $scope.places = [];

                var map = L.map('map').setView([$scope.latitude, $scope.longitude], 13);

                L.tileLayer(Config.BASE_LAYER_URL, {
                    maxZoom: 18,
                    id: Config.MAPBOX_PROJECT_ID,
                    accessToken: Config.MAPBOX_PROJECT_ID
                }).addTo(map);

                var marker = L.marker([location.coords.latitude, location.coords.longitude])
                                .addTo(map)
                                .bindPopup("Your are here").openPopup();

                marker.on('click', function () {
                    console.log("click");
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('This is an alert title')
                            .content('You can specify some description text in here.')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Got it!')
                    );
                });
            });
    }]);
});