'use strict';

define([
    'require',
    'angular',
    'material',
    'app',
    './config/constants',
    './config/interceptors',
    './config/routes'
], function(require,angular){
    require(['domReady!'], function(document) {
        angular.bootstrap(document, ['app']);
    });
});
