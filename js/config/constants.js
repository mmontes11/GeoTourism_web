'use strict';

define([
    '../app',
    './privateConstants'
], function (app, privateConfig) {
    app.constant('Config', {
        //Production
        //API_ROOT_URL: 'http://geotourism.eastus.cloudapp.azure.com/api',
        //API_ROOT_URL: 'https://geotourism-mmontes.rhcloud.com',
        //Development
        API_ROOT_URL: 'http://localhost:9090',

        TILE_LAYER: 'OpenStreetMap.Mapnik',

        TOAST_TIMEOUT: 2000,
        TOAST_POSITION: 'top right',

        FACEBOOK_APP_ID: privateConfig.FACEBOOK_APP_ID,
        FACEBOOK_PERMISSIONS: 'public_profile,user_friends',

        DATE_FORMAT: "YYYY-MM-DD"
    });
});
