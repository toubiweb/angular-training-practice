(function () {
    'use strict';

    angular.module('tw.practice').directive('twHasRouteAccess', twHasRouteAccess);
    
    /** @ngInject */
    function twHasRouteAccess(twRouteSecurityService) {
        return {
            scope: {},
            link: function preLink($scope, element, attrs) {

                if (twRouteSecurityService.hasAccess(attrs.twHasRouteAccess)) {
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