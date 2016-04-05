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
        angularMaterialDataTable: '/bower_components/angular-material-data-table/dist/md-data-table.min',
        angularUiRouter: '../bower_components/angular-ui-router/release/angular-ui-router.min',
        angularMessages: '../bower_components/angular-messages/angular-messages.min',
        angularFacebook: '../bower_components/angular-facebook/lib/angular-facebook',
        ngFileUpload: '../bower_components/ng-file-upload/ng-file-upload.min',
        ngSortable: '../bower_components/ng-sortable/dist/ng-sortable.min',
        require: '../bower_components/requirejs/require',
        domReady: '../bower_components/requirejs-domready/domReady',
        md5: '../bower_components/angular-md5/angular-md5.min',
        base64: '../bower_components/angular-base64/angular-base64',
        leaflet: '../bower_components/leaflet/dist/leaflet',
        'leaflet-providers': '../bower_components/leaflet-providers/leaflet-providers',
        'leaflet-markers': '../bower_components/leaflet-markers/src/leaflet.extra-markers',
        'heatmap': '../lib/heatmap',
        'leaflet-heatmap': '../lib/leaflet-heatmap',
        'leaflet-markercluster': '../bower_components/leaflet.markercluster/dist/leaflet.markercluster',
        wellknown: '../bower_components/wellknown/wellknown',
        'please-wait': '../bower_components/please-wait/build/please-wait.min',
        'moment': '../bower_components/moment/min/moment-with-locales'
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
        angularMaterialDataTable: {
            deps: ['angularMaterial']
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
        ngSortable: {
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
        },
        'leaflet-heat': {
            deps: ['leaflet']
        },
        'leaflet-heatmap': {
            deps: ['leaflet','heatmap']
        },
        'leaflet-markercluster': {
            deps: ['leaflet']
        }
    },
    deps: ['bootstrap']
});
