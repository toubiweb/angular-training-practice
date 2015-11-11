(function () {
    'use strict';

    angular.module('tw.practice.security').factory('twRouteSecurityService', twRouteSecurityService);

    /** @ngInject */
    function twRouteSecurityService($log, $state, twSecurityService) {
 
        var service = {};

        var key = 'security.auth.token';
        
        // public methods
        service.hasAccess = hasAccess;
        service.go = go;

        function isSecured(state){
            return (state.authenticate || state.roles);
        }
        
        function hasAccess(stateName) {

            var state = $state.get(stateName);
            
            if (isSecured(state)){
                // route is secured
                if (!twSecurityService.isAuthenticated()){
                    // user not authenticated
                    return false;
                }
                
                if (state.roles){
                    // route is secured by role
                    if (twSecurityService.hasOneOfRoles(state.roles)){
                        //ok
                        return true;
                    }else{
                        // access denied
                        return false;
                    }
                }
                
                return true;
                
            }else{
                return true;
            }
        }

        function go(stateName, params) {
            if (hasAccess(stateName)){
                $state.go(stateName, params);
                return true;
            }else{
                return false;
            }
        }

        return service;
      
    }

}());