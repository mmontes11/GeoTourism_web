'use strict';

define([
    'angular',
    'angularMaterial',
    'angularResource',
    'material',
    './modules/common/index',
    './modules/admin/index'
], function(angular){

    return  angular.module('app', ['app.common','app.admin','ngMaterial','ngResource','ui.router']);
});

