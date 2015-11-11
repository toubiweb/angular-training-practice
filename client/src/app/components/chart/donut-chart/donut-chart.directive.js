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
        vm.chartConfig = {
            cssId: 'tw-donut-chart' + Math.floor(Math.random() * 1000000),
            cssClass: 'tw-donut-chart',
            title: '100%'
        };
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

            var height = 350;
            var width = 350;
            var chart1;
            twNvd3.addGraph(function () {

                var chart1 = twNvd3.models.pieChart()
                    .x(function (d) {
                        return d.key
                    })
                    .y(function (d) {
                        return d.y
                    })
                    .donut(true)
                    .width(width)
                    .height(height)
                    .padAngle(.08)
                    .cornerRadius(5)
                    .id('donut');

                chart1.title(vm.chartConfig.title);

                chart1.pie.donutLabelsOutside(true).donut(true);
                $scope.$watch('vm.chartData', function (chartData) {
                    if (chartData) {
                        twD3.select('#' + vm.chartConfig.cssId)
                            .datum(chartData)
                            .transition().duration(1200)
                            .call(chart1);
                    }
                });

                return chart1;
            });

        }

        return vm;

    }

})();