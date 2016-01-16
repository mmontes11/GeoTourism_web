'use strict';

define([
    '../module',
    'wellknown',
    'leaflet',
    'leaflet-markers'
], function(module,wellknown,L){
    module.service('FeatureService', ['MarkerIconService',function(MarkerIconService){
        this.layer2WKT = function (layer) {
            return wellknown.stringify(layer.toGeoJSON());
        };
        this.feature2layer = function(customFeature){
            return L.geoJson(wellknown.parse(customFeature.geom),
                {
                    pointToLayer: function(feature, latlng) {
                        var customIcon = MarkerIconService.getMarkerIcon(customFeature.icon);
                        return new L.Marker(latlng, {icon: customIcon});
                    }
                });
        };
    }]);
});