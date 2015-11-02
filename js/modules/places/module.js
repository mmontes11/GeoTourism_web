'use strict';

define([
    'angular'
], function(angular){
    return angular.module('app.places',['app.common','app.map','app.wikipedia','app.aws']);
});
