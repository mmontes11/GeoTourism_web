'use strict';

define([
    'angular',
    'angularMessages',
    'md5',
    'base64',
    'ngFileUpload',
    'ui-iconpicker'
], function(angular){
    return angular.module('app.common',['ngMessages','angular-md5','base64','ngFileUpload','ui-iconpicker']);
});
