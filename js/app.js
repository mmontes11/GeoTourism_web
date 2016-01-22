'use strict';

define([
    'angular',
    'angularMaterial',
    'angularResource',
    'angularAnimate',
    'ngSortable',
    'material',
    'underscore',
    './modules/common/index',
    './modules/admin/index',
    './modules/places/index',
    './modules/routes/index',
    './modules/gis/index',
    './modules/wikipedia/index',
    './modules/facebook/index',
    './modules/social/index'
], function(angular){
    return  angular.module('app', ['app.common','app.admin','app.places','app.routes','app.gis','app.wikipedia','app.facebook', 'app.social',
                                    'ngMaterial','ngResource','ngAnimate','as.sortable','ui.router']);
});

