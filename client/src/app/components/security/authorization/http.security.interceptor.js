(function () {
    'use strict';

    angular.module('tw.practice.security').factory('twHttpSecurityInterceptor', twHttpSecurityInterceptor);

    /** @ngInject */
    function twHttpSecurityInterceptor($log, $q, $location, $rootScope, twTokenStorageService) {

       return {
            // add authorization token to headers
            request: function (config) {

                // try to retrieve token
                var token = twTokenStorageService.getToken();
                if (token) {
                    // set authentication header (with bearer prefix)
                    setAuthenticationHeader(config, token, true);
                }
                return config;
            },

            // intercept http errors
            responseError: function (response) {
                if (response.status === 401) {
                    // authorization error: logout
                    $rootScope.$emit('tw.security.do-logout');
                }
                return $q.reject(response);
            }
        };

        function setAuthenticationHeader(config, token, appendBearerPrefix) {
            // read token from cookies
            if (token) {
                $log.debug('Security token: %s', token);
                // ensure headers attribute is defined
                config.headers = config.headers || {};
                // set authorization header
                if (appendBearerPrefix) {
                    config.headers.Authorization = 'Bearer ' + token;
                } else {
                    config.headers.Authorization = token;
                }
            }
        }
    }

}());