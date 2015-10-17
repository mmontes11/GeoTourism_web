'use strict';

define([
    '../module'
], function(module){
    module.service('CityService',['$resource','Config', function($resource,Config){
        return $resource(
            //Resource URL
            Config.API_ROOT_URL + '/city',
            //Default Parameters
            {},
            //Actions
            {}
        );
    }]);
});
