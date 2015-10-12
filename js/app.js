'use strict';

define([
    'angular',
    'angularMaterial',
    'angularResource',
    'material',
    './modules/common/index',
    './modules/admin/index',
    './modules/places/index'
], function(angular){

    return  angular.module('app', ['app.common','app.admin','app.places','ngMaterial','ngResource','ui.router']);
});

