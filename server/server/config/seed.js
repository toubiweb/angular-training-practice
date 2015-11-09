/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';

User.find({}).exec(function (err, users) {

    if (!users || users.length === 0) {
        // create default users
        var defaultUsers = [
            {
                login: 'john',
                password: 'pass',
                role: 'user',
                provider: 'local',
                firstName: 'John',
                lastName: 'Smith',
                email: 'john@smith.net',
                gender: 'male',
                employed: true,
                salary: 10000
            },
            {
                login: 'mary',
                password: 'pass',
                role: 'admin',
                provider: 'local',
                firstName: 'Mary',
                lastName: 'Johnson',
                email: 'mary@johnson.com',
                gender: 'female',
                employed: false
            }
        ];


        console.log('Create %d default users.', defaultUsers.length);
        User.createAsync(defaultUsers).then(function () {
            console.log('Finished populating %d users.', defaultUsers.length);
        });
    }

});