'use strict';

define([
    'require',
    'angular',
    'app',
    './config/constants',
    './config/interceptors',
    './config/routes'
], function(require,angular){
    require(['domReady!'], function(document) {
        angular.bootstrap(document, ['app']);
    });
});
