(function () {
    'use strict';

    angular.module('tw.practice.chart').factory('twNvd3', twNvd3);

    /** @ngInject */
    function twNvd3($window, $log) {
        if (!$window.nv) {
            $log.error('Global nv variable is not available.');
            return null;
        }
        
        var service = $window.nv;
        
        return service;
    }

})();