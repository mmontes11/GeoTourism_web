'use strict';

define([
    '../module'
], function(module){
    module.service('LocationService', function(){

        this.getLocationString = function(longitude,latitude){
            return longitude + "," + latitude;
        };
    });
});