'use strict';

define([
    '../app',
    './privateConfig'
], function(app,PrivateConfig){
    app.constant('Config', {
        API_ROOT_URL: 'http://server:9090/GeoTourism',

        MAPBOX_ACCESS_TOKEN: PrivateConfig.MAPBOX_ACCESS_TOKEN,
        MAPBOX_PROJECT_ID: PrivateConfig.MAPBOX_PROJECT_ID,
        BASE_LAYER_URL: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+PrivateConfig.MAPBOX_ACCESS_TOKEN,

        TOAST_TIMEOUT: 2000,
        TOAST_POSITION: 'top right'
    });
});
