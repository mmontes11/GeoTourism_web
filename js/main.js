'use strict';

require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore-min',
        angular: '../bower_components/angular/angular',
        angularResource: '../bower_components/angular-resource/angular-resource.min',
        angularAria: '../bower_components/angular-aria/angular-aria.min',
        angularAnimate: '../bower_components/angular-animate/angular-animate.min',
        angularMaterial: '../bower_components/angular-material/angular-material.min',
        angularUiRouter: '../bower_components/angular-ui-router/release/angular-ui-router.min',
        angularMessages: '../bower_components/angular-messages/angular-messages.min',
        angularFacebook: '../bower_components/angular-facebook/lib/angular-facebook',
        ngFileUpload: '../bower_components/ng-file-upload/ng-file-upload.min',
        material: '../bower_components/material-design-lite/material.min',
        require: '../bower_components/requirejs/require',
        domReady: '../bower_components/requirejs-domready/domReady',
        md5: '../bower_components/angular-md5/angular-md5.min',
        base64: '../bower_components/angular-base64/angular-base64',
        leaflet: '../bower_components/leaflet/dist/leaflet',
        'leaflet-providers': '../bower_components/leaflet-providers/leaflet-providers',
        'leaflet-markers': '../bower_components/leaflet-markers/src/leaflet.extra-markers',
        wellknown: '../bower_components/wellknown/wellknown'
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        underscore: {
            exports: '_'
        },
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        angularRoute: {
            deps: ['angular']
        },
        angularResource: {
            deps: ['angular']
        },
        angularAria: {
            deps: ['angular']
        },
        angularAnimate: {
            deps: ['angular']
        },
        angularMaterial: {
            deps: ['angular','angularAnimate','angularAria']
        },
        angularUiRouter: {
            deps: ['angular']
        },
        angularMessages: {
            deps: ['angular']
        },
        angularFacebook: {
            deps: ['angular']
        },
        ngFileUpload: {
            deps: ['angular']
        },
        md5: {
            deps: ['angular']
        },
        base64: {
            deps: ['angular']
        },
        'leaflet-providers': {
            deps: ['leaflet']
        },
        'leaflet-markers': {
            deps: ['leaflet']
        }
    },
    deps: ['bootstrap']
});
