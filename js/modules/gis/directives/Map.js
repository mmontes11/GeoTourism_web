'use strict';

define([
    '../module',
    'underscore',
    'leaflet',
    'leaflet-providers'
], function (module, _, L) {
    module.directive('map', ['Config', 'FeatureService', function (Config, FeatureService) {
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
                deletelayer: "="
            },
            link: function (scope) {

                var tileLayer = L.tileLayer.provider(Config.TILE_LAYER);

                var featuresLayers = L.layerGroup([]);

                var map = L.map('map', {
                    minZoom: 5,
                    layers: [tileLayer, featuresLayers]
                });

                var fireBoundsChanged = function () {
                    scope.boundschanged = L.rectangle(map.getBounds());
                };

                map.locate({
                    locate: true,
                    setView: true,
                    enableHighAccuracy: true
                });

                map.on('locationfound dragend zoomend', function () {
                    scope.$apply(function () {
                        fireBoundsChanged();
                    });
                });

                map.on('click', function (e) {
                    scope.$apply(function () {
                        scope.locationclicked = L.marker(e.latlng);
                    });
                });

                var updateLayers = function(features) {
                    featuresLayers.eachLayer(function(layer){
                        if(!layer.avoidDelete){
                            featuresLayers.removeLayer(layer);
                        }else{
                            features = _.filter(features,function(feature){
                                return (feature.id != layer.customFeature.id || feature.geom != layer.customFeature.geom);
                            });
                        }
                    });
                    return features;
                };

                scope.$watchCollection('features', function (features) {
                    if (angular.isDefined(features)) {
                        features = updateLayers(features);
                        angular.forEach(features, function (feature) {
                            if (angular.isDefined(feature)) {
                                var layer = FeatureService.feature2layer(feature);
                                layer.avoidDelete = false;
                                layer.on('click', function (e) {
                                    var type = e.layer.feature.geometry.type;
                                    var customFeature = _.extend(feature.toJSON(), {type: type});
                                    var customLayer = _.extend(layer, {customFeature: customFeature});
                                    if (type == "Point") {
                                        customLayer.setIcon = function (icon) {
                                            e.layer.setIcon(icon);
                                        };
                                    }
                                    scope.$apply(function () {
                                        scope.layerclicked = customLayer;
                                    });
                                });
                                featuresLayers.addLayer(layer);
                            }
                        });
                    }
                });

                scope.$watch('deletelayer', function (layer) {
                    if (angular.isDefined(layer)) {
                        featuresLayers.removeLayer(layer);
                    }
                });
            }
        };
    }]);
});
