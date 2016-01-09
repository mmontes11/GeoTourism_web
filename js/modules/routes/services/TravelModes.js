'use strict';

define([
    '../module'
], function (module) {
    module.service('TravelModes',['$resource','Config',function($resource,Config){
        return $resource(
            //Resource URL
            Config.API_ROOT_URL + '/travelModes',
            //Default Parameters
            {},
            //Actions
            {}
        );
    }]);
});