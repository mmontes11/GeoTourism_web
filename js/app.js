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
    './modules/facebook/index'
], function(angular){
    return  angular.module('app', ['app.common','app.admin','app.places','app.map','app.wikipedia','app.facebook',
                                    'ngMaterial','ngResource','ui.router']);
});

