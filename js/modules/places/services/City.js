'use strict';

define([
    '../module'
], function(module){
    module.service('City',['$resource','Config', function($resource,Config){
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
