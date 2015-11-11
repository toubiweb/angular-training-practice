(function () {
    'use strict';

    angular.module('tw.practice').directive('twHasRole', twHasRole);
    /** @ngInject */
    function twHasRole(twSecurityService) {
        return {
            scope: {},
            link: function preLink($scope, element, attrs) {

                if (twSecurityService.hasRole(attrs.twHasRole)) {
                    // show
                    element.removeClass('hidden');
                } else {
                    // hide
                    element.addClass('hidden');
                }

            }
        };
    }

}());