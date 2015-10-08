define([
    '../module'
], function(module){

    module.controller('MainLayoutCtrl', ['$scope','AuthAdminService', function($scope,AuthAdminService){
        console.log(AuthAdminService.isAuthenticated);
    }]);
});
