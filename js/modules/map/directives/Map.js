'use strict';

define([
    '../module',
    'underscore',
    'leaflet',
    'leaflet-omnivore'
], function(module,_,L,omnivore){
    module.directive('map',['Config', function(Config){
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'partials/map/map.html',
            scope: {
                boundschanged: "=",
                locationclicked: "=",
                features: "=",
                layerclicked: "=",
                layerdelete: "="
            },
            link: function(scope,element,attrs){

                var tileLayer = L.tileLayer(Config.BASE_LAYER_URL, {
                    id: Config.MAPBOX_PROJECT_ID,
                    accessToken: Config.MAPBOX_PROJECT_ID
                });

                var markers = L.layerGroup([]);

                var map = L.map('map', {
                    minZoom: 5,
                    layers: [tileLayer,markers]
                });

                var fireBoundsChanged = function(){
                    scope.boundschanged = L.rectangle(map.getBounds());
                };

                map.locate({
                    locate: true,
                    setView: true,
                    enableHighAccuracy: true
                });

                map.on('locationfound', function(){
                    scope.$apply(function(){
                        fireBoundsChanged();
                    });
                });

                map.on('dragend',function(){
                    scope.$apply(function(){
                        fireBoundsChanged();
                    });
                });

                map.on('zoomend',function(){
                    scope.$apply(function(){
                        fireBoundsChanged();
                    });
                });

                map.on('click',function(location){
                    scope.$apply(function(){
                        scope.locationclicked = L.marker(location.latlng);
                    });
                });

                scope.$watch('features', function(features){
                    if (angular.isDefined(features)){
                        markers.clearLayers();
                        angular.forEach(features, function(feature){
                            if (angular.isDefined(feature)){
                                var layer = omnivore.wkt.parse(feature.geom);
                                console.log(layer);
                                layer.customFeature = feature.toJSON();
                                layer.on('click',function(e){
                                    scope.$apply(function(){
                                        scope.layerclicked = e.target;
                                    });
                                });
                                markers.addLayer(layer);
                            }
                        });
                    }
                }, true);

                scope.$watch('layerdelete', function(layer){
                    if (angular.isDefined(layer)){
                        markers.removeLayer(layer);
                    }
                });
            }
        };
    }]);
});
