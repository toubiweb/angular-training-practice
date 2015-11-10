(function () {
    'use strict';

    angular.module('tw.practice.security').factory('twSecurityService', twSecurityService);

    /** @ngInject */
    function twSecurityService($rootScope, $log, $q, $cookies, $location, jwtHelper, twHttpAuthenticationService) {

        var service = {};

        // private attributes
        var currentUser = null;

        // public methods
        service.login = login;
        service.logout = logout;
        service.isAuthenticated = isAuthenticated;
        service.hasOneOfRoles = hasOneOfRoles;
        service.hasRole = hasRole;
        service.getCurrentUser = getCurrentUser;

        function login(login, password) {

            var deferred = $q.defer();

            twHttpAuthenticationService.login(login, password).then(function (token) {

                $log.debug('User logged in with token: %s.', token);
                deferred.resolve(currentUser);

            }, function error(err) {
                // authentication error
                $log.error(err);
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function logout() {

            var deferred = $q.defer();

            twHttpAuthenticationService.logout().then(function (res) {
                // success
                currentUser = null;

                $log.debug('User logged out.');
                deferred.resolve(res);

            }, function error(err) {
                // logout error
                $log.error(err);
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function isAuthenticated() {
            if (currentUser !== null) {
                // user already authenticated
                return true;
            } else {
                // NOT IMPLEMENTED
                return false;
            }
            return false;
        }

        function hasOneOfRoles(roles) {
            // NOT IMPLEMENTED
            return false;
        }

        function hasRole(role) {
            // NOT IMPLEMENTED
            return false;
        }

        function getCurrentUser() {
            return currentUser;
        }

        return service;
    }

}());
