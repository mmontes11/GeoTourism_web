'use strict';

define([
    '../module'
], function (module) {
    module.service('Admin', ['$resource', 'Config', function ($resource, Config) {
            return $resource(
                //Resource URL
                Config.API_ROOT_URL + '/admin',
                //Default Parameters
                {},
                //Actions
                {
                    logIn: {
                        method: 'POST',
                        url: Config.API_ROOT_URL + '/logIn'
                    },
                    validateToken: {
                        method: 'GET'
                    },
                    getBBox: {
                        method: 'GET',
                        url: Config.API_ROOT_URL + '/admin/config/bbox'
                    },
                    updateBBox: {
                        method: 'POST',
                        url: Config.API_ROOT_URL + '/admin/config/bbox'
                    },
                    getOSMTypes: {
                        method: 'GET',
                        url: Config.API_ROOT_URL + '/admin/config/osmtypes',
                        isArray: true
                    },
                    getUnreviewedTIPs: {
                        method: 'GET',
                        url: Config.API_ROOT_URL + '/admin/config/tips',
                        isArray: true
                    }
                }
            );
        }]);
});
