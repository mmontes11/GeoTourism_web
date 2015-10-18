'use strict';

define([
    'angular',
    'angularMessages',
    'md5',
    'base64'
], function(angular){

    return angular.module('app.common',['ngMessages','angular-md5','base64']);
});
