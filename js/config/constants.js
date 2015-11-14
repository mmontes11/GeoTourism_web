'use strict';

define([
    '../app',
    './privateConfig'
], function(app,privateConfig){
    app.constant('Config', {
        API_ROOT_URL: 'http://server:9090/GeoTourism',

        TILE_LAYER: 'OpenStreetMap.Mapnik',

        TOAST_TIMEOUT: 2000,
        TOAST_POSITION: 'top right',

        FACEBOOK_APP_ID: privateConfig.FACEBOOK_APP_ID,
        FACEBOOK_PERMISSIONS: 'public_profile,user_friends'
    });
});
