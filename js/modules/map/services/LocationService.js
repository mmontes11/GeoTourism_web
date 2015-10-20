'use strict';

define([
    '../module'
], function(module){
    module.service('LocationService', ['$q', function($q){

        this.getLocationString = function(longitude,latitude){
            return longitude + "," + latitude;
        };

        this.latLng2WKT = function(latLng){
            return "POINT(" + latLng.lng + " " + latLng.lat + ")";
        };

        this.getCurrentLocation = function(){
            var deferred = $q.defer();
            navigator.geolocation.getCurrentPosition(function (pos) {
                deferred.resolve(pos);
            }, function (error) {
                deferred.reject(error)
            });
            return deferred.promise;
        };
    }]);
});