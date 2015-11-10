(function () {
    'use strict';

    angular.module('tw.practice.login').controller('TwLogoutController', TwLogoutController);

    function TwLogoutController($rootScope, $log, $state, toastr, twSecurityService) {

        // immediate logout
        twSecurityService.logout();
    }

}());