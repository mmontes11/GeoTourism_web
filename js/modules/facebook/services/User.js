'use strict';

define([
    '../module'
], function (module) {
    module.service('User', ['$resource', 'Config', function ($resource, Config) {
        return $resource(
            //Resource URL
            Config.API_ROOT_URL + '/user',
            //Default Parameters
            {},
            //Actions
            {
                createOrRetrieve:{
                    method: 'POST'
                }
            }
        );
    }]);
});