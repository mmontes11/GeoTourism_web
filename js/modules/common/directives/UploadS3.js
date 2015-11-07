'use strict';

define([
    '../module'
], function (module) {
    module.directive('fileS3', function () {
        return {
            restrict: 'A',
            scope: {
                file: '@'
            },
            link: function (scope, el, attrs) {
                var bound = false;
                el.bind('change', function (event) {
                    var files = event.target.files;
                    var file = files[0];
                    scope.$apply(function () {
                        scope.file = file;
                        scope.$parent.file = file;
                        bound = true;
                    });
                });
                scope.$parent.$watch('file',function(file){
                    if (bound && angular.isUndefined(file)){
                        el.replaceWith(el.val('').clone(true));
                    }
                });
            }
        };
    });
    module.directive('uploadS3', ['Config','NotificationService', function (Config,NotificationService) {
        return {
            restrict: 'E',
            templateUrl: 'partials/common/uploadS3.html',
            link: function(scope, el, attrs){
                scope.uploadProgress = 0;
                scope.upload = function() {
                    if(scope.file) {
                        var parts = scope.file.type.split("/");
                        if (parts[0] != "image"){
                            resetUpload();
                            NotificationService.displayMessage("File type not valid");
                            return false;
                        }
                        var fileSize = Math.round(parseInt(scope.file.size));
                        if (fileSize > Config.AWS_S3_UPLOAD_LIMIT_B) {
                            resetUpload();
                            NotificationService.displayMessage("Photo size should be less than 10MB");
                            return false;
                        }
                        AWS.config.update({ accessKeyId: Config.AWS_ACCESS_KEY, secretAccessKey: Config.AWS_SECRET_KEY });
                        var uniqueFileName = getUniqueFilename(scope.file.name);
                        var bucket = new AWS.S3.ManagedUpload({
                            params: {
                                Bucket: Config.AWS_S3_BUCKET,
                                Key: uniqueFileName,
                                ContentType: scope.file.type,
                                Body: scope.file,
                                ServerSideEncryption: Config.AWS_S3_SERVER_SIDE_ENCRYPTION,
                                ACL: Config.AWS_S3_ACL
                            }
                        });
                        bucket.send(function(err, data){
                            if(err) {
                                scope.$apply(function(){
                                    resetUpload();
                                });
                                return false;
                            }
                            else {
                                NotificationService.displayMessage("Photo Uploaded!");
                                scope.$apply(function(){
                                    resetUpload(data.Location);
                                });
                            }
                        });
                        bucket.on('httpUploadProgress',function(progress) {
                            var p = Math.round(progress.loaded / progress.total * 100);
                            scope.$apply(function(){
                                scope.uploadProgress = p;
                            });
                        });
                    }
                };
                var getUniqueFilename = function(fileName){
                    var now = new Date();
                    return now.getTime() + fileName;
                };
                var resetUpload = function(result){
                    scope.file = undefined;
                    scope.uploadProgress = 0;
                    if (angular.isDefined(result)){
                        scope.uploadedurl= result;
                    }
                };
            }
        };
    }]);
});