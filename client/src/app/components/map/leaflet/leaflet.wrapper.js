(function () {
    'use strict';

    angular.module('tw.practice.map').factory('twLeaflet', twLeaflet);

    /** @ngInject */
    function twLeaflet($window, $log) {
        if (!$window.L) {
            $log.error('Global L variable is not available.');
            return null;
        }
        
        var service = $window.L.noConflict();
        
        return service;
    }

})();