'use strict';

define([
    'require',
    'angular',
    'app',
    './config/constants',
    './config/interceptors',
    './config/routes',
    './config/libraries',
    './config/analytics'
], function(require,angular){
    require(['domReady!'], function(document) {
        angular.bootstrap(document, ['app']);
    });
});
