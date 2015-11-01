'use strict';

define([
    'angular',
    'angularMaterial',
    'angularResource',
    'material',
    'ngFileUpload',
    './modules/common/index',
    './modules/admin/index',
    './modules/places/index',
    './modules/map/index',
    './modules/wikipedia/index'
], function(angular){

    return  angular.module('app', ['app.common','app.admin','app.places','app.map','app.wikipedia','ngMaterial','ngResource','ui.router','ngFileUpload']);
});

