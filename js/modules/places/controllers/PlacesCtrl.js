'use strict';

define([
    '../module'
], function (module) {
    module.controller('PlacesCtrl', ['$scope', '$q', 'LocationService', 'CityService', 'TIPs', 'TIP',
        'AuthAdminService', 'NotificationService', 'DialogService',
        function ($scope, $q, LocationService, CityService, TIPs, TIP,
                  AuthAdminService, NotificationService, DialogService) {

            $scope.isAuthenticated = function () {
                return AuthAdminService.isAuthenticated;
            };

            $scope.types = [
                {id: "M", name: "Monument"}
            ];

            $scope.cities = [
                {id: 2, name: "Santiago de Compostela"}
            ];

            $scope.allowAddTIPs = false;

            $scope.addTIP = function () {
                NotificationService.displayMessage("Click to add Places");
                $scope.allowAddTIPs = true;
            };

            $scope.finishAddTIPs= function () {
                $scope.allowAddTIPs = false;
            };

            $scope.$watch('isAuthenticated()', function (newVal, oldVal) {
                if (angular.isDefined(newVal) && !newVal) {
                    $scope.allowAddTIPs = false;
                }
            });

            $scope.$watch('locationchanged', function (locationNew, locationOld) {
                if (angular.isDefined(locationNew)) {
                    var locationStr = LocationService.getLocationString(locationNew.lng, locationNew.lat);
                    $scope.features = TIPs.query({location: locationStr});
                }
            });

            $scope.$watch('locationclicked', function (location) {
                if ($scope.isAuthenticated() && $scope.allowAddTIPs && angular.isDefined(location)) {

                    var locationStr = LocationService.getLocationString(location.lng, location.lat);

                    CityService.get({location: locationStr}).$promise
                        .then(function () {

                            DialogService.showAddPlaceDialog()
                                .then(function (place) {

                                    place["geometry"] = LocationService.latLng2WKT(location);
                                    TIP.save(place).$promise
                                        .then(function(createdTIP){
                                            NotificationService.displayMessage("Place created!");
                                            $scope.features = [createdTIP];
                                        }, function(){
                                            NotificationService.displayMessage("Error creating Place");
                                        });
                                });
                        }, function () {
                            NotificationService.displayMessage("The place should be located in a existing city");
                        });
                }
            });

        }]);
});