(function () {
    'use strict';

    angular.module('tw.practice.profile').factory('twUserGeneratorService', twUserGeneratorService);

    function twUserGeneratorService($state, twUserRepository) {

        var service = {};

        service.generateUsers = generateUsers;
        service.generateUser = generateUser;

        function generateUsers(nbUsersToGenerate, inject) {
            var users = [];
            for (var i = 0; i < nbUsersToGenerate; i++) {
                users.push(generateUser());
            }
            if (inject){
                var injectedUsers = twUserRepository.injectAll(users);
                return injectedUsers;
            }else{
                return users;
            }
        }

        function generateUser() {
            var user = {
                _id: '' + Math.floor(Math.random() * 10000000) + Math.floor(Math.random() * 10000000),
                password: 'pass',
                role: 'user',
                provider: 'local',
                firstName: service.getRandomUserData().firstName,
                lastName: service.getRandomUserData().lastName,
                gender: service.getRandomBoolean() ? 'male' : 'female',
                employed: service.getRandomBoolean(),
                birthdate: service.getRandomDate (new Date(1970, 0, 1), new Date(1995, 0, 1)),
                location: {
                    coordinates: {
                        lat: 34.6805200 + (Math.random() * 0.05) - (Math.random() * 0.05),
                        lng: -1.9076400 + (Math.random() * 0.05) - (Math.random() * 0.05)
                    }
                }
            };

            user.login = (user.firstName + '.' + user.lastName).toLowerCase();
            user.email = (user.firstName + '.' + user.lastName + '@' + 'toubiweb.com').toLowerCase();
            if (user.employed) {
                user.salary = Math.floor(Math.random() * (100 - 70) + 70) * 100;
            }
            return user;
        }
        
        service.getRandomDate = function (start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }

        service.getRandomBoolean = function () {
            var randomBoolean = Math.random() >= 0.5;
            return randomBoolean;
        }

        service.getRandomUserData = function () {
            var randomIndex = Math.floor(Math.random() * service.randomUsersData.length);
            return service.randomUsersData[randomIndex];
        }

        service.randomUsersData = [
            {
                "lastName": "Figueroa",
                "firstName": "Sasha"
            },
            {
                "lastName": "Gibbs",
                "firstName": "Mai"
            },
            {
                "lastName": "Jordan",
                "firstName": "Darlene"
            },
            {
                "lastName": "Hendricks",
                "firstName": "Jenkins"
            },
            {
                "lastName": "Lyons",
                "firstName": "Chris"
            },
            {
                "lastName": "Yates",
                "firstName": "Hurst"
            },
            {
                "lastName": "Salas",
                "firstName": "Leslie"
            },
            {
                "lastName": "Schroeder",
                "firstName": "Kitty"
            },
            {
                "lastName": "Walker",
                "firstName": "Rosalinda"
            },
            {
                "lastName": "Dalton",
                "firstName": "Alford"
            },
            {
                "lastName": "Payne",
                "firstName": "Mary"
            },
            {
                "lastName": "Fuller",
                "firstName": "Cecile"
            },
            {
                "lastName": "Alexander",
                "firstName": "Brown"
            },
            {
                "lastName": "Powers",
                "firstName": "Stuart"
            },
            {
                "lastName": "Spears",
                "firstName": "Knapp"
            },
            {
                "lastName": "Delacruz",
                "firstName": "Spears"
            },
            {
                "lastName": "Cervantes",
                "firstName": "Lorie"
            },
            {
                "lastName": "Mccall",
                "firstName": "Moran"
            },
            {
                "lastName": "Nolan",
                "firstName": "Bennett"
            },
            {
                "lastName": "Salinas",
                "firstName": "Charlene"
            }
];
        // generated from http://beta.json-generator.com/
        /*     [
                  {
                    'repeat:20': {
                       firstName: '{{firstName()}}',
                      lastName: '{{surname()}}'
                    }
                  }
                ]
                ]*/


        return service;
    }

}());