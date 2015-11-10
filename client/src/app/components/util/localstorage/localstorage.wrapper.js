(function () {
    'use strict';

    angular.module('tw.practice.util').factory('twLocalStorage', twLocalStorage);

    /** @ngInject */
    function twLocalStorage($window, $log) {
        if (!$window.localStorage) {
            $log.error('Global moment variable is not available.');
            return null;
        }
        var service = $window.localStorage
        return service;
    }

})();
