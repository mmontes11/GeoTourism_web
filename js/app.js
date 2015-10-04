'use strict';

define([
    'angular',
    'angularRoute',
    './modules/common/index'
], function(angular){
    return  angular.module('app', ['ngRoute','app.common']);
});

