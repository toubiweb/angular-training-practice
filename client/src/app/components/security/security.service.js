(function () {
    'use strict';

    angular.module('tw.practice.security').factory('twSecurityService', twSecurityService);

    /** @ngInject */
    function twSecurityService($rootScope, $log, $q, $cookies, $location, jwtHelper, twHttpAuthenticationService, twTokenStorageService) {

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

        function buildSecurityUser(token) {

            var tokenClaims = jwtHelper.decodeToken(token);

            $log.debug('Token claims:', tokenClaims);

            var user = {
                id: tokenClaims._id,
                role: tokenClaims.role,
                firstName: tokenClaims.firstName,
                lastName: tokenClaims.lastName
            };

            return user;
        }

        function login(login, password) {

            var deferred = $q.defer();

            twHttpAuthenticationService.login(login, password).then(function (token) {

                // success: save security token
                twTokenStorageService.setToken(token);

                // build security user
                currentUser = buildSecurityUser(token)

                $log.debug('Emit logged-in message.');
                $rootScope.$emit('tw.security.user-logged-in');
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

                // remove token
                twTokenStorageService.removeToken();

                $log.debug('Emit logged-out message.');
                $rootScope.$emit('tw.security.user-logged-out');
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
                // try to read token
                var token = twTokenStorageService.getToken();

                if (token) {
                    // build security user
                    currentUser = buildSecurityUser(token)

                    $log.info('User authenticated: ', currentUser);
                    return true;
                }
            }
            return false;
        }

        function hasOneOfRoles(roles) {
            return isAuthenticated() && (roles.indexOf(currentUser.role) === -1);
        }

        function hasRole(role) {
            return isAuthenticated() && role === currentUser.role;
        }

        function getCurrentUser() {
            return currentUser;
        }

        return service;
    }

}());