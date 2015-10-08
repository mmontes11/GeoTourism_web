'use strict';

define([
    '../module',
    'leaflet'
], function (module, L) {
    module.controller('PlacesAdminCtrl', ['$scope', '$mdDialog', 'geolocation', 'Config', function ($scope, $mdDialog, geolocation, Config) {

        geolocation.position()
            .then(function (location) {

                var map = L.map('map').setView([location.coords.latitude, location.coords.longitude], 13);

                L.tileLayer(Config.BASE_LAYER_URL, {
                    maxZoom: 18,
                    id: Config.MAPBOX_PROJECT_ID,
                    accessToken: Config.MAPBOX_PROJECT_ID
                }).addTo(map);

                var marker = L.marker([location.coords.latitude, location.coords.longitude]).addTo(map);

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
