'use strict';

define([
    'angular',
    'ngFileUpload'
], function(angular){

    return angular.module('app.places',['ngFileUpload','app.map']);
});
