'use strict';

define([
    '../module'
], function(module){
    module.service('FeatureService', ['FeatureType',function(FeatureType){

        this.toWKT = function toWKT(layer) {
            var lng, lat, coords = [];
            if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
                var latlngs = layer.getLatLngs();
                for (var i = 0; i < latlngs.length; i++) {
                    coords.push(latlngs[i].lng + " " + latlngs[i].lat);
                    if (i === 0) {
                        lng = latlngs[i].lng;
                        lat = latlngs[i].lat;
                    }
                }
                if (layer instanceof L.Polygon) {
                    return "POLYGON((" + coords.join(",") + "," + lng + " " + lat + "))";
                } else if (layer instanceof L.Polyline) {
                    return "LINESTRING(" + coords.join(",") + ")";
                }
            } else if (layer instanceof L.Marker) {
                return "POINT(" + layer.getLatLng().lng + " " + layer.getLatLng().lat + ")";
            }
        };

        this.getType = function (layer) {
            if (layer instanceof L.Marker){
                return FeatureType.MARKER;
            }
            if (layer instanceof L.Polyline){
                return FeatureType.POLYLINE;
            }
            if (layer instanceof L.MultiPolyline){
                return FeatureType.MULTIPOLYLINE;
            }
            if (layer instanceof L.Polygon){
                return FeatureType.POLYGON;
            }
            if (layer instanceof L.MultiPolygon){
                return FeatureType.MULTIPOLYGON;
            }
            return undefined;
        };
    }]);
});