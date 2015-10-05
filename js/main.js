'use strict';

require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore-min',
        angular: '../bower_components/angular/angular',
        angularRoute: '../bower_components/angular-route/angular-route.min',
        angularCookies: '../bower_components/angular-cookies/angular-cookies.min',
        angularResource: '../bower_components/angular-resource/angular-resource.min',
        angularAria: '../bower_components/angular-aria/angular-aria.min',
        angularAnimate: '../bower_components/angular-animate/angular-animate.min',
        angularMaterial: '../bower_components/angular-material/angular-material.min',
        angularUiRouter: '../bower_components/angular-ui-router/release/angular-ui-router.min',
        material: '../bower_components/material-design-lite/material.min',
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
        }
    },
    deps: ['bootstrap']
});
