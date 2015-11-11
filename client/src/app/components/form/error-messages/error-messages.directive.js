(function () {
    'use strict';

    angular.module('tw.practice.form').directive('twErrorMessages', twErrorMessages);

    /** @ngInject */
    function twErrorMessages() {
        return {
            templateUrl: 'app/components/form/error-messages/error-messages.directive.html',
            controllerAs: 'vm',
            scope: {
                form: '=',
                attributeName: '@'
            },
            bindToController: true,
            controller: TwErrorMessagesController,
            transclude: true
        };
    }

    /** @ngInject */
    function TwErrorMessagesController() {

        var vm = this;

        // scope attributes

        // scope methods

        // init method
        init();

        function init() {


        }

        return vm;
    }

})();