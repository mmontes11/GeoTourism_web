'use strict';

define([
    '../module'
], function (module) {
    module.service('TIP', ['$resource', 'Config', function ($resource, Config) {
        return $resource(
            //Resource URL
            Config.API_ROOT_URL + '/admin/tip/:id',
            //Default Parameters
            {
                id: '@id'
            },
            //Actions
            {
                get: {
                    method: 'GET',
                    url: Config.API_ROOT_URL + '/tip/:id'
                },
                patch: {
                    method: 'PATCH'
                }
            }
        );
    }]);
});