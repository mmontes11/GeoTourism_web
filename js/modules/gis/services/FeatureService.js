'use strict';

define([
    '../module',
    'wellknown'
], function(module,wellknown){
    module.service('FeatureService',  function(){
        this.layer2WKT = function (layer) {
            return wellknown.stringify(layer.toGeoJSON());
        };
        this.WKT2layer = function(WKT){
            return L.geoJson(wellknown.parse(WKT));
        };
    });
});