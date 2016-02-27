'use strict';

define([
    '../module'
], function (module) {
    module.service('Stats',["$resource", function($resource){
        return $resource(
            //Resource URL
            Config.API_ROOT_URL + '/stats',
            //Default Parameters
            {},
            //Actions
            {}
        );
    }]);
});