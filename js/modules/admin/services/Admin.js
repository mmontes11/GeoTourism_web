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
                        url: Config.API_ROOT_URL + '/admin/config/tip/type/:id/osmtypes',
                        params: {
                            id: "@id"
                        },
                        isArray: true
                    },
                    getUnreviewedTIPs: {
                        method: 'GET',
                        url: Config.API_ROOT_URL + '/admin/config/tips',
                        isArray: true
                    },
                    getOSMKeys: {
                        method: 'GET',
                        url: Config.API_ROOT_URL + '/admin/config/osmkeys',
                        isArray: true
                    },
                    getOSMTypeValues: {
                        method: 'GET',
                        url: Config.API_ROOT_URL + '/admin/config/osmkey/:osmKey/osmtypes',
                        params: {
                          osmKey: "@osmKey"
                        },
                        isArray: true
                    },
                    checkOSMType: {
                        method: 'GET',
                        url: Config.API_ROOT_URL + '/admin/config/osmtype/:osmType?hasTIPtype=false',
                        params: {
                            osmType: "@osmType"
                        }
                    }
                }
            );
        }]);
});
