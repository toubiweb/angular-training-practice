(function () {
    'use strict';

    // TODO s'inspirer de app/components/form/password/form.password.service.spec.js
    // pour tester user.generator.service.js
    // - test de generateUser qui vérifie que l'objet retourné à un email et une date de naissance valide
    // - test de generateUsers qui vérifie que le nombre d'users retourné correspond à celui passé en paramètre
    // - test de generateUsers avec des valeurs limites (0, -1)
   
    describe('twUserGeneratorService', function () {

        // TODO: load module

        // TODO retrieve service instance

        it('generateUser should return a valid email', function () {
            
            // TODO: call twUserGeneratorService.generateUser
            var user = {};
            
            expect(user.email).toBeDefined();
            expect(user.email).toBeAValidEmail();
        });

        it('generateUser should return a valid birthdate', function () {
            
            // TODO: call twUserGeneratorService.generateUser
            var user = {};
            
            expect(user.birthdate).toBeDefined();
            expect(user.birthdate instanceof Date).toBeTruthy();
        });

        it('generateUsers should return the required number of results', function () {
            
            {
                // TODO: call twUserGeneratorService.generateUsers
                var users10 = [1,2,3];
                expect(users10.length).toEqual(10);
            }
            {
                // TODO: call twUserGeneratorService.generateUsers
                var users0 = [1,2,3];
                expect(users0.length).toEqual(0);
            }
            {
                // TODO: call twUserGeneratorService.generateUsers
                var usersNegative = [1,2,3];
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