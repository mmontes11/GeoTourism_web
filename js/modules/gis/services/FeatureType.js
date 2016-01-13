'use strict';

define([
    '../module'
], function (module) {
    module.factory('FeatureType', function () {
        return {
            MARKER: 0,
            POLYLINE: 1,
            MULTIPOLYLINE: 2,
            POLYGON: 3,
            MULTIPOLYGON: 4
        };
    });
});