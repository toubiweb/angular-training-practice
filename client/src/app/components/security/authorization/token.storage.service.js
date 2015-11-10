(function () {
    'use strict';

    angular.module('tw.practice.security').factory('twTokenStorageService', twTokenStorageService);

    /** @ngInject */
    function twTokenStorageService($log) {

        var service = {};

        var key = 'security.auth.token';
        
        // public methods
        service.setToken = setToken;
        service.getToken = getToken;
        service.removeToken = removeToken;

        function setToken(token) {
            $log.debug('Store authentication token "%s".', token);
            // TODO
        }

        function getToken() {
            var token = null; // TODO
            if (!token){
                token = null;
            }
            return token;
        }

        function removeToken() {
            $log.debug('Clear authentication token.');
            // TODO
        }

        return service;
    }

}());