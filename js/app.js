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
    './modules/map/index'
], function(angular){

    return  angular.module('app', ['app.common','app.admin','app.places','app.map','ngMaterial','ngResource','ui.router','ngFileUpload']);
});

