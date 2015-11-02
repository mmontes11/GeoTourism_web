'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogAddPlaceCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {

        $scope.types = [
            {id: "M", name: "Monument"},
            {id: "NS", name: "Natural Space"},
            {id: "H", name: "Hotel"},
            {id: "R", name: "Restaurant"}
        ];

        $scope.close = function () {
            $mdDialog.cancel();
        };

        $scope.save = function () {
            if (angular.isDefined($scope.photo)) {
                $scope.place.photoContent = $scope.photo.$ngfDataUrl;
                $scope.place.photoName = $scope.photo.name;
            }
            if (angular.isDefined($scope.infoUrl)){
                $scope.place.infoUrl = $scope.infoUrl;
            }
            $mdDialog.hide($scope.place);
        };

        $scope.$watch('selectedsearchitem', function (item) {
            if (angular.isDefined(item)) {
                $scope.infoUrl = item.url;
            } else {
                $scope.infoUrl = undefined;
            }
        });
        $scope.sizeLimit      = 10585760; // 10MB in Bytes
        $scope.uploadProgress = 0;
        $scope.creds          = {
            bucket: 'geotourism',
            access_key: 'AKIAIQ4RINCTJIROV2SQ',
            secret_key: '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'
        };

        $scope.upload = function() {
            if($scope.file) {
                // Perform File Size Check First
                var fileSize = Math.round(parseInt($scope.file.size));
                if (fileSize > $scope.sizeLimit) {
                    console.log('Limit file reached');
                    return false;
                }
                AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
                var uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;
                var bucket = new AWS.S3.ManagedUpload({
                    params: {
                        Bucket: $scope.creds.bucket,
                        Key: uniqueFileName,
                        ContentType: $scope.file.type,
                        Body: $scope.file,
                        ServerSideEncryption: 'AES256',
                        ACL: 'public-read'
                    }
                });
                bucket.send(function(err, data) {
                    if(err) {
                        console.log('Error uploading');
                        return false;
                    }
                    else {
                        // Upload Successfully Finished
                        console.log('File uploaded');
                        console.log(data);

                        // Reset The Progress Bar
                        setTimeout(function() {
                            $scope.uploadProgress = 0;
                            $scope.$digest();
                        }, 4000);
                    }
                });
                bucket.on('httpUploadProgress',function(progress) {
                    console.log(Math.round(progress.loaded / progress.total * 100));
                });
            }
            else {
                // No File Selected
                console.log('Select a file to upload');
            }
        };

        $scope.fileSizeLabel = function() {
            // Convert Bytes To MB
            return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
        };

        $scope.uniqueString = function() {
            var text     = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 8; i++ ) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
    }]);
});
