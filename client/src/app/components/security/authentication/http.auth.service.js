(function () {
    'use strict';

    angular.module('tw.practice.security').provider('twHttpAuthenticationService', twHttpAuthenticationServiceProvider);

    /** @ngInject */
    function twHttpAuthenticationServiceProvider() {

        var provider = {};

        // public methods
        provider.configure = configure;
        provider.$get = getService;

        provider.$get = getService;

        // default configuration
        var config = {
            baseUrl: '',
            loginUrl: '/api/login',
            loginMethod: 'POST',
            logoutUrl: '/api/logout',
            logoutMethod: 'POST'
        };

        // override default configuration
        function configure(options) {
            angular.extend(config, options);
        }

        // service
        function getService($log, $q, $cookies, $location, $http) {

            var service = {};

            // public methods
            service.login = login;
            service.logout = logout;

            function login(login, password) {

                var deferred = $q.defer();

                
                $http({
                    method: config.loginMethod,
                    url: config.baseUrl + config.loginUrl,
                    data: {
                        login: login,
                        password: password
                    }
                }).then(function successCallback(response) {
                    // success
                    if (response.data && response.data.token){
                        var token = response.data.token;
                        deferred.resolve(token);
                    }else{
                        deferred.reject(new Error('Token not found in authentication answer.'));
                    }
                }, function errorCallback(response) {
                    // authentication error
                    if (response.statusText){
                        $log.error(response.statusText);
                    }else{
                        $log.error('Unexpected error during authentication.');
                    }
                    deferred.reject(new Error('Unexpected error during authentication.'));
                });

                return deferred.promise;
            }

            function logout() {

                var deferred = $q.defer();

                if (config.logoutUrl) {
                    // http logout
                    $http({
                        method: config.logoutMethod,
                        url: config.baseUrl + config.logoutUrl
                    }).then(function successCallback(response) {
                        // success: remove token
                        deferred.resolve({});
                    }, function errorCallback(response) {
                        // logout error
                        $log.error(response.data.message);
                        deferred.reject(new Error(response.data.message));
                    })
                } else {
                    // no http logout available: simply remove token
                    deferred.resolve({});
                }
                return deferred.promise;
            }

            return service;
        }

        return provider;
    }

}());