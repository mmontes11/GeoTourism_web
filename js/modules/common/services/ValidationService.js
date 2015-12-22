'use strict';

define([
    '../module'
], function(module){
    module.service('ValidationService', function(){
        this.arrayChanged = function(newVal,oldVal){
            return (!_.isEmpty(newVal) || (_.isEmpty(newVal) && !_.isEmpty(oldVal)));
        };
        this.valueChanged = function(newVal,oldVal){
            return (!_.isUndefined(newVal) || (_.isUndefined(newVal) && !_.isUndefined(oldVal)));
        };
    });
});
