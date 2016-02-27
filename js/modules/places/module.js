'use strict';

define([
    'angular'
], function(angular){
    return angular.module('app.places',['app.common','app.gis','app.wikipedia','app.social','app.stats']);
});
