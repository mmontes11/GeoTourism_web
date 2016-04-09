'use strict';

define([
    '../module',
    'underscore',
    'leaflet',
    'leaflet-providers',
    'leaflet-heatmap',
    'leaflet-markercluster',
    'leaflet-areaselect',
    'leaflet-bouncemarker'
], function (module, _, L, leafletProviders, HeatmapOverlay) {
    module.directive('map', ['Config', 'FeatureService', '$timeout', function (Config, FeatureService, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'partials/gis/map.html',
            scope: {
                mapid: "@",
                locate: "@",
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
                heatdata: "=",
                areaselect: "@",
                areaselected: "=",
                bboxfeature: "=",
                bouncemarkers: "=",
                bounce: "="
            },
            link: function (scope, element, attrs) {
                scope.mapid = scope.mapid || 'map';
                element.attr("id",scope.mapid);

                var locate = eval(scope.locate);
                var layers = [];
                if (eval(scope.markercluster)) {
                    var markerClusterGroup = L.markerClusterGroup();
                    layers.push(markerClusterGroup);
                    scope.$watchCollection('markerclusterfeatures', function (features) {
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
                if (eval(scope.heatmap)) {
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
                    scope.$watch('heatdata', function (heatdata) {
                        if (angular.isDefined(heatdata)) {
                            heatMapLayer.setData(heatdata);
                        }
                    });
                }

                var tileLayer = L.tileLayer.provider(Config.TILE_LAYER);
                scope.boundingboxlayers = L.featureGroup();
                scope.permanentlayers = L.featureGroup();
                layers = _.union(layers, [tileLayer, scope.boundingboxlayers, scope.permanentlayers]);

                var map = L.map(scope.mapid, {
                    minZoom: 5,
                    maxZoom: 20,
                    layers: layers
                });

                var areaSelect;
                scope.$watch("areaselect", function (newval) {
                    if (angular.isDefined(newval)) {
                        if (eval(newval)) {
                            areaSelect = L.areaSelect({width: 300, height: 300});
                            areaSelect.addTo(map);
                            areaSelect.on("change", function () {
                                var that = this;
                                scope.$apply(function () {
                                    scope.areaselected = L.rectangle(that.getBounds());
                                });

                            });
                        } else if (angular.isDefined(areaSelect)) {
                            areaSelect.remove();
                        }
                    }
                });

                if (locate) {
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
                }else{
                    map.setView([51.505, -0.09], 13);
                }

                map.on('click', function (e) {
                    scope.$apply(function () {
                        scope.locationclicked = L.marker(e.latlng);
                    });
                });

                var addNonExistingLayers = function (features) {
                    var existingLayers = _.union(scope.boundingboxlayers.getLayers(), scope.permanentlayers.getLayers());
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

                var addPermanentFeatures = function(features){
                    angular.forEach(features, function (feature) {
                        var layer = feature2layer(feature);
                        scope.permanentlayers.addLayer(layer);
                    });
                };

                scope.$watchCollection('permanentfeatures', function (features) {
                    if (angular.isDefined(features)) {
                        addPermanentFeatures(features);
                    }
                });

                var bboxlayer;
                scope.$watch('bboxfeature', function (feature) {
                    if (angular.isDefined(feature)) {
                        if (angular.isDefined(bboxlayer)) {
                            scope.permanentlayers.removeLayer(bboxlayer);
                        }
                        bboxlayer = feature2layer(feature).getLayers()[0];
                        map.fitBounds(bboxlayer.getBounds());
                        scope.permanentlayers.addLayer(bboxlayer);
                    }
                });

                scope.$watchCollection('bouncemarkers', function(markers){
                    if (angular.isDefined(markers) && markers.length > 0){
                        markers = _.map(markers, function(marker){
                            marker["bounceOptions"] = {
                                bounceHeight : 60,
                                bounceSpeed  : 54
                            };
                            return marker;
                        });
                        addPermanentFeatures(markers);
                    }
                });

                var findLayer = function (layers, id) {
                    var layer = _.filter(layers, function (layer) {
                        return layer.customFeature.id == id;
                    });
                    layer = layer.length > 0 ? layer[0] : undefined;
                    return layer;
                };

                scope.$watch("bounce", function(TIPId){
                    if (angular.isDefined(TIPId)){
                        var marker = findLayer(scope.permanentlayers.getLayers(),TIPId).getLayers()[0];
                        marker.toggleBouncing();
                        map.panTo(marker.getLatLng(),{animate:true});
                    }
                });

                scope.$on("map.stopbouncing", function(stop){
                    if (stop){
                        L.Marker.stopAllBouncingMarkers();
                    }
                });
            }
        }
    }]);
});
