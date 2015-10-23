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
                locationchanged: "=",
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

                map.on('locationfound', function(location){
                    scope.$apply(function(){
                        scope.location = location.latlng;
                        scope.locationchanged = location.latlng;
                    });
                });

                map.on('dragend',function(){
                    var center = map.getCenter();
                    scope.$apply(function(){
                        scope.location = center;
                    });
                });

                map.on('click',function(location){
                    scope.$apply(function(){
                        scope.locationclicked = location.latlng;
                    });
                });

                var acumulatedDistance = 0;
                scope.$watch('location',function(newValue,oldValue){
                    if (angular.isDefined(newValue) && angular.isDefined(oldValue)){
                        acumulatedDistance += newValue.distanceTo(oldValue);
                        if (acumulatedDistance > Config.SEARCH_THRESHOLD_METRES){
                            scope.locationchanged = newValue;
                            acumulatedDistance = 0;
                        }
                    }
                },true);

                scope.$watch('features', function(features,oldVal){
                    if (angular.isDefined(features)){
                        angular.forEach(features, function(feature, key){
                            if (angular.isDefined(feature)){
                                var layer = omnivore.wkt.parse(feature.geom).addTo(map);
                                layer.customFeature = feature;
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
