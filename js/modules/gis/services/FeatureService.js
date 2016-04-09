'use strict';

define([
    '../module',
    'wellknown',
    'leaflet',
    'leaflet-markers'
], function(module,wellknown,L){
    module.service('FeatureService', ['FeatureStyleService',function(FeatureStyleService){
        this.layer2WKT = function (layer) {
            return wellknown.stringify(layer.toGeoJSON());
        };
        this.feature2layer = function(customFeature){

            return L.geoJson(wellknown.parse(customFeature.geom),
                {
                    pointToLayer: function(feature, latlng) {
                        var customIcon = FeatureStyleService.getMarkerIcon(customFeature.icon,customFeature.color);
                        var options = {
                            icon: customIcon
                        };
                        var marker = new L.Marker(latlng, options);
                        if (angular.isDefined(customFeature.bounceOptions)){
                            marker.setBouncingOptions(customFeature.bounceOptions);
                        }
                        return marker;
                    },
                    style: FeatureStyleService.getFeatureStyle(customFeature.color)
                });
        };
    }]);
});