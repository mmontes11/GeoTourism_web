'use strict';

require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore-min',
        material: '../bower_components/material-design-lite/material.min',
        angular: '../bower_components/angular/angular',
        angularRoute: '../bower_components/angular-route/angular-route.min',
        angularCookies: '../bower_components/angular-cookies/angular-cookies.min',
        angularResource: '../bower_components/angular-resource/angular-resource.min',
        require: '../bower_components/requirejs/require',
        domReady: '../bower_components/requirejs-domready/domReady',
        base64: '../bower_components/angular-base64/angular-base64'
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        underscore: {
            exports: '_'
        },
        material: {
            exports: 'material'
        },
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        angularRoute: {
            deps: ['angular']
        },
        angularCookies: {
            deps: ['angular']
        },
        angularResource: {
            deps: ['angular']
        }
    },
    deps: ['bootstrap']
});
