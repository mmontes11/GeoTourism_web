'use strict';

define([
    'angular',
    'angularMaterial',
    './modules/common/index',
    './modules/admin/index'
], function(angular){
    return  angular.module('app', ['app.common','app.admin','ngMaterial','ui.router']);
});

