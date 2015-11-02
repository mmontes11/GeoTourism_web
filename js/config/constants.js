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

        AWS_ACCESS_KEY: PrivateConfig.AWS_ACCESS_KEY,
        AWS_SECRET_KEY: PrivateConfig.AWS_SECRET_KEY,
        AWS_S3_BUCKET: PrivateConfig.AWS_S3_BUCKET,
        AWS_S3_UPLOAD_LIMIT_B: 10585760,
        AWS_S3_SERVER_SIDE_ENCRYPTION: 'AES256',
        AWS_S3_ACL: 'public-read',

        TOAST_TIMEOUT: 2000,
        TOAST_POSITION: 'top right'
    });
});
