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

            var testdata = [
                {key: "One", y: 5},
                {key: "Two", y: 2},
                {key: "Three", y: 9},
                {key: "Four", y: 7},
                {key: "Five", y: 4},
                {key: "Six", y: 3},
                {key: "Seven", y: 0.5}
            ];
            var height = 350;
            var width = 350;
            var chart1;
            nv.addGraph(function() {
                var chart1 = nv.models.pieChart()
                    .x(function(d) { return d.key })
                    .y(function(d) { return d.y })
                    .donut(true)
                    .width(width)
                    .height(height)
                    .padAngle(.08)
                    .cornerRadius(5)
                    .id('donut1'); // allow custom CSS for this one svg
                chart1.title("100%");
                chart1.pie.donutLabelsOutside(true).donut(true);
                d3.select("#test1")
                    .datum(testdata)
                    .transition().duration(1200)
                    .call(chart1);
                //nv.utils.windowResize(chart1.update);
                return chart1;
            });
        }

        return vm;

    }

})();