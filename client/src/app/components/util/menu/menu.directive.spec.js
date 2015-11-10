(function () {
    'use strict';

    describe('Test directive menu', function () {
        var $compile,
            $rootScope, $scope, $log;
        
        // load module containing the directive
        beforeEach(module('tw.practice.util'));

        // load templates
        beforeEach(module('ngHtml2JsPreprocessor'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$log_) {
            // the injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $log = _$log_;
        }));

        it('should add active class to menu when activeMenu matchs', function () {

            // compile the template
            var element = angular.element('<div tw-menu active-menu="activeMenu"></div>');
            var template = $compile(element)($scope);

            // update root scope with view-uses as active menu
            $scope.activeMenu = 'view-users';
            // run a $digest cycle to update your template with new data
            $rootScope.$digest();
            
            // expect view-users-item to be active
            expect(template.find('li.view-users-item').hasClass('active')).toBeTruthy();

        });

        it('should hide create-user when user is in edition', function () {

            // compile the template
            var element = angular.element('<div tw-menu active-menu="activeMenu"></div>');
            var template = $compile(element)($scope);

            // update root scope with view-uses as active menu
            $scope.activeMenu = 'edit-user';
            // run a $digest cycle to update your template with new data
            $rootScope.$digest();
            
            // $log.debug(template);
            // console.log(template);
            
            // expect creat-users to be hidden
            expect(template.find('li.create-user-item').length).toEqual(0);
            expect(template.find('li.edit-user-item').length).toEqual(1);

        });
    });

}());
