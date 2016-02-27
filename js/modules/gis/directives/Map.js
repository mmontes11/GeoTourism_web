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
                boundingboxfeatures: "=",
                boundingboxlayers: "=",
                permanentfeatures: "=",
                permanentlayers: "=",
                layerclicked: "="
            },
            link: function (scope) {

                var tileLayer = L.tileLayer.provider(Config.TILE_LAYER);
                scope.boundingboxlayers = L.layerGroup([]);
                scope.permanentlayers = L.layerGroup([]);

                var map = L.map('map', {
                    minZoom: 5,
                    layers: [tileLayer, scope.boundingboxlayers, scope.permanentlayers]
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

                var updateBBLayers = function (features) {
                    scope.boundingboxlayers.clearLayers();
                    features = _.filter(features, function (feature) {
                        var filteredLayers = _.filter(scope.permanentlayers.getLayers(), function (layer) {
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
                        features = updateBBLayers(features);
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
