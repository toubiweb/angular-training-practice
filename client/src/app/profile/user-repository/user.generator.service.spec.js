(function () {
    'use strict';

    describe('twUserGeneratorService', function () {

       // load module
        beforeEach(module('tw.practice.profile'));

        // retrieve service instance
        var twUserGeneratorService;

        beforeEach(inject(function (_twUserGeneratorService_) {
            twUserGeneratorService = _twUserGeneratorService_;
        }));

        it('generateUser should return a valid email', function () {
            
            var user = twUserGeneratorService.generateUser();
            
            expect(user.email).toBeDefined();
            expect(user.email).toBeAValidEmail();
        });

        it('generateUser should return a valid birthdate', function () {
            
            var user = twUserGeneratorService.generateUser();
            
            expect(user.birthdate).toBeDefined();
            expect(user.birthdate instanceof Date).toBeTruthy();
        });

        it('generateUsers should return the required number of results', function () {
            
            {
                var users10 = twUserGeneratorService.generateUsers(10);
                expect(users10.length).toEqual(10);
            }
            {
                var users0 = twUserGeneratorService.generateUsers(0);
                expect(users0.length).toEqual(0);
            }
            {
                var usersNegative = twUserGeneratorService.generateUsers(-1);
                expect(usersNegative.length).toEqual(0);
            }
        });

        beforeEach(function () {
            // custom jasmine matcher 
           jasmine.addMatchers({
                toBeAValidEmail: function () {
                    return {
                        compare: function (email) {
                            var regexp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                            
                            var result = {
                                pass: regexp.test(email)
                            };
                            if (result.pass) {
                                result.message = 'Valid email.';
                            } else {
                                result.message = 'Expected a valid email but got "' + email + '".';
                            }
                            return result;
                        }
                    }
                }
            });
        });

    });
})();