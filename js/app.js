'use strict';

define([
    'angular',
    'angularMaterial',
    'angularResource',
    'material',
    './modules/common/index',
    './modules/admin/index',
    './modules/places/index',
    './modules/map/index',
    './modules/wikipedia/index',
    './modules/facebook/index',
    './modules/social/index'
], function(angular){
    return  angular.module('app', ['app.common','app.admin','app.places','app.map','app.wikipedia','app.facebook', 'app.social',
                                    'ngMaterial','ngResource','ui.router']);
});

