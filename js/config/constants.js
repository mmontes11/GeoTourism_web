'use strict';

define([
    '../app'
], function(app){
    app.constant('Config', {
        API_ROOT_URL: 'http://server:9090/GeoTourism',

        TILE_LAYER: 'OpenStreetMap.Mapnik',

        TOAST_TIMEOUT: 2000,
        TOAST_POSITION: 'top right'
    });
});
