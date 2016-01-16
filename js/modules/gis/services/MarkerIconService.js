'use strict';

define([
    '../module',
    'leaflet',
    'leaflet-markers'
], function(module,L){
    module.service('MarkerIconService',  function(){
        this.getMarkerIcon = function(icon,markerColor){
            markerColor = markerColor || 'cyan';
            return L.ExtraMarkers.icon({
                icon: icon,
                prefix: 'fa',
                markerColor: markerColor,
                shape: 'circle',
                iconColor: 'black',
                spin: false
            });
        };
    });
});