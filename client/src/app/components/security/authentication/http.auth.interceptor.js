(function () {
    'use strict';

    angular.module('tw.practice.security').factory('twAuthenticationHttpInterceptor', twAuthenticationHttpInterceptor);

    /** @ngInject */
    function twAuthenticationHttpInterceptor($log, $q, $cookies, $location, $rootScope, twTokenStorageService) {

        return {
            // add authorization token to headers
            request: function (config) {

                // try to retrieve token
                TODO
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
    }

}());