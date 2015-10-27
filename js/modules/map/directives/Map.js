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

                var map = L.map('map');

                map.locate({
                    locate: true,
                    setView: true,
                    enableHighAccuracy: true
                });

                L.tileLayer(Config.BASE_LAYER_URL, {
                    minZoom: 4,
                    maxZoom: 18,
                    id: Config.MAPBOX_PROJECT_ID,
                    accessToken: Config.MAPBOX_PROJECT_ID
                }).addTo(map);

                var fireBoundsChanged = function(){
                    scope.boundschanged = L.rectangle(map.getBounds());
                };

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

                scope.$watch('features', function(features,oldVal){
                    if (angular.isDefined(features)){
                        angular.forEach(features, function(feature, key){
                            if (angular.isDefined(feature)){
                                var layer = omnivore.wkt.parse(feature.geom).addTo(map);
                                layer.customFeature = feature.toJSON();
                                layer.on('click',function(e){
                                    scope.$apply(function(){
                                        scope.layerclicked = e.target;
                                    });
                                });
                            }
                        });
                    }
                }, true);

                scope.$watch('layerdelete', function(layer){
                    if (angular.isDefined(layer)){
                        map.removeLayer(layer)
                    }
                });
            }
        };
    }]);
});
