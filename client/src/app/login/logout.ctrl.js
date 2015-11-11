(function () {
    'use strict';

    angular.module('tw.practice.login').controller('TwLogoutController', TwLogoutController);

    /** @ngInject */
    function TwLogoutController(twSecurityService) {

        // immediate logout
        twSecurityService.logout();
    }

}());