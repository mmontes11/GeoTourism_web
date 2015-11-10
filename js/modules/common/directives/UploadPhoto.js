'use strict';

define([
    '../module'
], function (module) {
    module.directive('uploadPhoto', ['Config','NotificationService','Upload', function (Config,NotificationService,Upload) {
        return {
            restrict: 'E',
            templateUrl: 'partials/common/uploadPhoto.html',
            scope: {
                uploadedurl: "="
            },
            link: function(scope, el, attrs){
                scope.uploading = false;
                scope.upload = function(photo){
                    scope.uploading = true;

                    Upload.upload({
                        url: Config.API_ROOT_URL + '/admin/upload',
                        file: scope.photo
                    }).then(function (res) {
                        scope.uploadedurl = res.data.url;
                        scope.resetUpload();
                        NotificationService.displayMessage("Photo uploaded");
                    }, function () {
                        scope.resetUpload();
                        NotificationService.displayMessage("Error uploading photo");
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ');
                    });
                };
                scope.resetUpload = function(){
                    scope.uploading = false;
                    scope.photo = undefined;
                };
            }
        };
    }]);
});