define([
    '../module'
], function(module){

    module.factory('AuthAdminService',function(){
        return {
            isAuthenticated: false
        };
    });
});