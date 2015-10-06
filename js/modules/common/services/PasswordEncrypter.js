define([
    '../module'
], function(module){

    module.service('PasswordEncrypter', ['md5','$base64', function(md5,$base64){

        this.encryptPassword = function(clearPassword){
            return $base64.encode(md5.createHash(clearPassword));
        };
    }]);
});
