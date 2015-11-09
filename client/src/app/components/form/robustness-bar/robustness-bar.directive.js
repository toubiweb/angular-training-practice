(function () {

    'use strict';

    angular.module('tw.practice.form').directive('twRobustnessBar', twRobustnessBar);

    function twRobustnessBar() {
        return {
            templateUrl: 'app/components/form/robustness-bar/robustness-bar.directive.html',
            controllerAs: 'vm',
            scope: {
                password: '='
            },
            transclude: true,
            bindToController: true,
            controller: TwRobustnessBarController
        };
    }

    function TwRobustnessBarController(twPasswordService) {

        var vm = this;

        // scope attributes

        // scope methods
        vm.getStrongnessPercentage = getStrongnessPercentage;
        vm.getProgressClass = getProgressClass;

        // init method
        init();

        function init() {

        }

        function getStrongnessPercentage() {
            var strongness = twPasswordService.checkStrongness(vm.password);
            return 10 * strongness;
        }

        function getProgressClass() {
            var p = getStrongnessPercentage();
            if (p < 50) {
                return 'progress-bar-danger';
            } else if (p < 80) {
                return 'progress-bar-warning';
            } else {
                return 'progress-bar-success';
            }
        }

        return vm;
    }


})();