'use strict';

define([
    '../module',
    'underscore',
    'leaflet',
    'leaflet-providers'
], function(module,_,L){
    module.directive('map',['Config', 'FeatureService', function(Config,FeatureService){
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'partials/gis/map.html',
            scope: {
                boundschanged: "=",
                locationclicked: "=",
                features: "=",
                layerclicked: "=",
                layerdelete: "="
            },
            link: function(scope){

                var tileLayer = L.tileLayer.provider(Config.TILE_LAYER);

                var featuresLayers = L.layerGroup([]);

                var map = L.map('map', {
                    minZoom: 5,
                    layers: [tileLayer,featuresLayers]
                });

                var fireBoundsChanged = function(){
                    scope.boundschanged = L.rectangle(map.getBounds());
                };

                map.locate({
                    locate: true,
                    setView: true,
                    enableHighAccuracy: true
                });

                map.on('locationfound dragend zoomend', function(){
                    scope.$apply(function(){
                        fireBoundsChanged();
                    });
                });

                map.on('click',function(e){
                    scope.$apply(function(){
                        scope.locationclicked = L.marker(e.latlng);
                    });
                });

                scope.$watch('features', function(features){
                    if (angular.isDefined(features)){
                        featuresLayers.clearLayers();
                        angular.forEach(features, function(feature){
                            if (angular.isDefined(feature)){
                                var layer = FeatureService.WKT2layer(feature.geom);
                                layer.customFeature = feature.toJSON();
                                layer.on('click',function(e){
                                    scope.$apply(function(){
                                        e.target.customFeature = _.extend(e.target.customFeature,{type: e.layer.feature.geometry.type});
                                        scope.layerclicked = e.target;
                                    });
                                });
                                featuresLayers.addLayer(layer);
                            }
                        });
                    }
                }, true);

                scope.$watch('layerdelete', function(layer){
                    if (angular.isDefined(layer)){
                        featuresLayers.removeLayer(layer);
                    }
                });
            }
        };
    }]);
});
