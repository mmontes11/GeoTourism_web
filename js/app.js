'use strict';

define([
    'angular',
    'angularMaterial',
    'angularResource',
    'angularGeolocation',
    'material',
    './modules/common/index',
    './modules/admin/index'
], function(angular){

    return  angular.module('app', ['app.common','app.admin','ngMaterial','ngResource','ngGeolocation','ui.router']);
});

