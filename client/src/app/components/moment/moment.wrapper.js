(function () {
    'use strict';

    angular.module('tw.practice').factory('twMoment', twMoment);

    /** @ngInject */
    function twMoment($window, $log) {
        if (!$window.moment) {
            $log.error('Global moment variable is not available.');
            return null;
        }
        var service = $window.moment;

        return service;
    }

})();