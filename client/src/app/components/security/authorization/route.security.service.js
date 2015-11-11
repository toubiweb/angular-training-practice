(function () {
    'use strict';

    angular.module('tw.practice.security').factory('twRouteSecurityService', twRouteSecurityService);

    /** @ngInject */
    function twRouteSecurityService($state) {
 
        var service = {};

        var key = 'security.auth.token';
        
        // public methods
        service.hasAccess = hasAccess;
        service.go = go;

        function hasAccess(route) {
            // TODO
            return true;
        }

        function go(route, params) {
            if (hasAccess(route)){
                $state.go(route, params);
                return true;
            }else{
                return false;
            }
        }

        return service;
      
    }

}());