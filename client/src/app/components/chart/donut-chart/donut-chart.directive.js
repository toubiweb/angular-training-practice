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
            cssId: 'tw-donut-chart' + Math.floor(Math.random() * 10000000),
            cssClass: 'tw-donut-chart',
            title: '100%',
            selected: ''
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

            twNvd3.addGraph(buildDonut);
        }

        function buildDonut() {

            var height = 350;
            var width = 350;

            vm.chart = twNvd3.models.pieChart()
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
                .id(vm.chartConfig.cssId);

            vm.chart.title(vm.chartConfig.title);

            vm.chart.pie.labelsOutside(true).donut(true);

            $scope.$watch('vm.chartData', function (chartData) {
                if (chartData) {
                    twD3.select('#' + vm.chartConfig.cssId)
                        .datum(chartData)
                        .transition().duration(1200)
                        .call(vm.chart);

                    twD3.selectAll('#' + vm.chartConfig.cssId + ' .nv-slice').on('click', function (d) {
                        vm.userChartConfig.selection = d.data.key;
                        $scope.$apply();
                    });
                }
            });

            return vm.chart;
        }

        return vm;

    }

})();