'use strict';

define([
    '../module',
    'leaflet',
    'leaflet-markers'
], function(module,L){
    module.service('FeatureStyleService',  function(){
        var defaultIcon = 'fa-globe';
        var defaultColor = 'cyan';
        this.getMarkerIcon = function(icon,markerColor){
            icon = icon || defaultIcon;
            markerColor = markerColor || defaultColor;
            return L.ExtraMarkers.icon({
                icon: icon,
                prefix: 'fa',
                markerColor: markerColor,
                shape: 'circle',
                iconColor: 'black',
                spin: false
            });
        };
        this.getFeatureStyle = function(color){
            color = color || defaultColor;
            return {
                weigth: 2,
                opacity: 0.5,
                color: color
            }
        };
    });
});