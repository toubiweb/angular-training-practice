(function () {
    'use strict';

    angular.module('tw.practice.chart').factory('twD3', twD3);

    /** @ngInject */
    function twD3($window, $log) {
        if (!$window.d3) {
            $log.error('Global nv variable is not available.');
            return null;
        }
        
        var service = $window.d3;
        
        return service;
    }

})();