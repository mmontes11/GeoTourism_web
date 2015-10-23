'use strict';

define([
    'angular',
    'ngFileUpload'
], function(angular){

    return angular.module('app.places',['app.common','ngFileUpload','app.map']);
});
