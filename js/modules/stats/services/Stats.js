'use strict';

define([
    '../module'
], function (module) {
    module.service('Stats', ["$resource", 'Config', function ($resource, Config) {
        return $resource(
            //Resource URL
            Config.API_ROOT_URL + '/social/stats',
            //Default Parameters
            {},
            //Actions
            {
                getMetrics: {
                    method: 'GET',
                    url: Config.API_ROOT_URL + '/social/stats/metrics',
                    isArray: true
                },
                getStats: {
                    method: 'POST',
                    url: Config.API_ROOT_URL + '/social/stats/metric/:metricID?fromDate=:fromDate&toDate=:toDate',
                    params: {
                        metricID: '@metricID',
                        fromDate: '@fromDate',
                        toDate: '@toDate'
                    }
                }
            }
        );
    }]);
});