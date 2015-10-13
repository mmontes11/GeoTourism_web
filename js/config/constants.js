'use strict';

define([
    '../app',
    './mapBoxConfig'
], function(app,MapBoxConfig){
    app.constant('Config', {
        API_ROOT_URL: 'http://server:9090/GeoTourism',
        MAPBOX_ACCESS_TOKEN: MapBoxConfig.MAPBOX_ACCESS_TOKEN,
        MAPBOX_PROJECT_ID: MapBoxConfig.MAPBOX_PROJECT_ID,
        BASE_LAYER_URL: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+MapBoxConfig.MAPBOX_ACCESS_TOKEN,
        SEARCH_RADIUS_METRES: 5000,
        SEARCH_THRESHOLD_METRES: 2000,
        TOAST_TIMEOUT: 2000,
        TOAST_POSITION: 'top right'
    });
});
