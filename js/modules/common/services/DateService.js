'use strict';

define([
    '../module',
    'moment'
], function(module,moment){
    module.service('DateService',['Config',function(Config){
        this.isInValidDate = function(date){
              return _.isNaN(date.getTime())
        };
        this.formatDate = function(dateString){
            var date = new Date(dateString);
            if (this.isInValidDate(date)){
                return undefined;
            }
            return moment(date).format(Config.DATE_FORMAT);
        };
        this.getFromToLastWeek = function(){
            return {
                fromDate: moment().subtract(7,'days').format(Config.DATE_FORMAT),
                toDate: moment().add(1, 'days').format(Config.DATE_FORMAT)
            }
        };
        this.getFromToLasMonth = function(){
            return {
                fromDate: moment().subtract(1,'month').format(Config.DATE_FORMAT),
                toDate: moment().add(1, 'days').format(Config.DATE_FORMAT)
            }
        };
    }]);
});