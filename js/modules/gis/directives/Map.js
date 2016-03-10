'use strict';

define([
    '../module',
    'underscore',
    'leaflet',
    'leaflet-providers',
    'leaflet-heatmap',
    'leaflet-markercluster'
], function (module, _, L, leafletProviders, HeatmapOverlay) {
    module.directive('map', ['Config', 'FeatureService', function (Config, FeatureService) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'partials/gis/map.html',
            scope: {
                boundschanged: "=",
                locationclicked: "=",
                layerclicked: "=",
                boundingboxfeatures: "=",
                boundingboxlayers: "=",
                permanentfeatures: "=",
                permanentlayers: "=",
                markercluster: "@",
                markerclusterfeatures: "=",
                heatmap: "@",
                heatdata: "="
            },
            link: function (scope) {
                var layers = [];
                if (eval(scope.markercluster)){
                    var markerClusterGroup = L.markerClusterGroup();
                    layers.push(markerClusterGroup);
                    scope.$watchCollection('markerclusterfeatures', function (features) {
                        console.log(features);
                        if (angular.isDefined(features)) {
                            markerClusterGroup.clearLayers();
                            features = addNonExistingLayers(features);
                            angular.forEach(features, function (feature) {
                                if (angular.isDefined(feature)) {
                                    var layer = feature2layer(feature);
                                    markerClusterGroup.addLayer(layer);
                                }
                            });
                        }
                    });
                }
                if (eval(scope.heatmap)){
                    var heatMapLayer = new HeatmapOverlay({
                        "radius": .005,
                        "maxOpacity": .5,
                        "scaleRadius": true,
                        "useLocalExtrema": true,
                        latField: 'lat',
                        lngField: 'lng',
                        valueField: 'weight'
                    });
                    layers.push(heatMapLayer);
                    scope.$watchCollection('heatdata', function (heatdata) {
                        if (angular.isDefined(heatdata)) {
                            heatMapLayer.setData(heatdata);
                        }
                    });
                }
                var tileLayer = L.tileLayer.provider(Config.TILE_LAYER);
                scope.boundingboxlayers = L.featureGroup();
                scope.permanentlayers = L.featureGroup();
                layers = _.union(layers,[tileLayer,scope.boundingboxlayers,scope.permanentlayers]);
                var map = L.map('map', {
                    minZoom: 5,
                    maxZoom: 20,
                    layers: layers
                });

                var fireBoundsChanged = function () {
                    scope.boundschanged = L.rectangle(map.getBounds());
                };

                map.locate({
                    locate: true,
                    setView: true,
                    maxZoom: 10,
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

                var addNonExistingLayers = function (features) {
                    var existingLayers = _.union(scope.boundingboxlayers.getLayers(),scope.permanentlayers.getLayers());
                    features = _.filter(features, function (feature) {
                        var filteredLayers = _.filter(existingLayers, function (layer) {
                            return (feature.id == layer.customFeature.id && feature.geom == layer.customFeature.geom);
                        });
                        return (filteredLayers.length == 0);
                    });
                    return features;
                };

                var getType = function (layer) {
                    if (layer.feature != undefined) {
                        return layer.feature.geometry.type;
                    } else if (layer.feature == undefined && layer._latlngs.length > 1) {
                        return "MultiLineString";
                    }
                    return undefined;
                };

                var feature2layer = function (feature) {
                    var layer = FeatureService.feature2layer(feature);
                    layer.customFeature = feature;
                    layer.on('click', function (e) {
                        var type = getType(e.layer);
                        scope.$apply(function () {
                            scope.layerclicked = {
                                typeClicked: type,
                                layer: layer
                            };
                        });
                    });
                    return layer;
                };

                scope.$watchCollection('boundingboxfeatures', function (features) {
                    if (angular.isDefined(features)) {
                        scope.boundingboxlayers.clearLayers();
                        features = addNonExistingLayers(features);
                        angular.forEach(features, function (feature) {
                            if (angular.isDefined(feature)) {
                                var layer = feature2layer(feature);
                                scope.boundingboxlayers.addLayer(layer);
                            }
                        });
                    }
                });

                scope.$watchCollection('permanentfeatures', function (features) {
                    if (angular.isDefined(features)) {
                        angular.forEach(features, function (feature) {
                            var layer = feature2layer(feature);
                            scope.permanentlayers.addLayer(layer);
                        });
                    }
                });
            }
        };
    }]);
});
