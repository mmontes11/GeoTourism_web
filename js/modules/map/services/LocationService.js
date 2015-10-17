'use strict';

define([
    '../module'
], function(module){
    module.service('LocationService', ['$q', function($q){

        this.getLocationString = function(longitude,latitude){
            return longitude + "," + latitude;
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