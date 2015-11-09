(function () {
    'use strict';

    angular.module('tw.practice.form').directive('twSalaryValidator', twSalaryValidator);

    function twSalaryValidator() {
        return {
            scope: {
                age: '='
            },
            require: 'ngModel',
            link: TwSalaryValidatorLink
        };
    }

    function TwSalaryValidatorLink($scope, $element, $attrs, ngModelCtrl) {

        init();

        function init() {

            ngModelCtrl.$validators.salary = function () {

                var salaryMin;
                if ($scope.age && $scope.age >= 20) {
                    salaryMin = 10000;
                } else {
                    salaryMin = 8000;
                }

                if (parseFloat(ngModelCtrl.$viewValue) < salaryMin) {
                    return false;
                } else {
                    return true;
                }
            };

            $scope.$watch(function(){
                return $scope.age;
            }, function (newAge, oldAge) {
                /*eslint angular/no-private-call: 0*/
                ngModelCtrl.$$parseAndValidate();
            });
        }

    }

}());