(function () {
    'use strict';

    angular.module('tw.practice.security').factory('twTokenStorageService', twTokenStorageService);

    /** @ngInject */
    function twTokenStorageService($log, twLocalStorage) {

        var service = {};

        var key = 'security.auth.token';
        
        // public methods
        service.setToken = setToken;
        service.getToken = getToken;
        service.removeToken = removeToken;

        function setToken(token) {
            $log.debug('Store authentication token "%s".', token);
            twLocalStorage.setItem(key, token);
        }

        function getToken() {
            var token = twLocalStorage.getItem(key);
            if (!token){
                token = null;
            }
            return token;
        }

        function removeToken() {
            $log.debug('Clear authentication token.');
            twLocalStorage.removeItem(key);
        }

        return service;
    }

}());