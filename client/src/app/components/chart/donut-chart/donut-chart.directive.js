(function () {
    'use strict';

    angular.module('tw.practice.chart').directive('twDonutChart', twDonutChart);

    function twDonutChart() {
        return {
            restrict: 'AE',
            templateUrl: 'app/components/chart/donut-chart/donut-chart.directive.html',
            controllerAs: 'vm',
            scope: {
                userChartConfig: '=chartConfig',
                chartData: '='
            },
            bindToController: true,
            controller: TwDonutChartController
        };
    }

    /** @ngInject */
    function TwDonutChartController($scope, $log, $timeout, twD3, twNvd3) {

        var vm = this;

        // scope attributes
        vm.chart = {};
        vm.chartConfig = {};
        // scope methods

        // init method
        init();

        function init() {

            $timeout(function () {
                // DOM has finished rendering
                renderMap();
            });
        }

        function renderMap() {

            angular.extend(vm.chartConfig, vm.userChartConfig);

            // TODO include static donutschart example from http://nvd3-community.github.io/nvd3/examples/site.html


        }

        return vm;

    }

})();