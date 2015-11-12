'use strict';

var _ = require('lodash');

var jsonpatch = require ('fast-json-patch');

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function (err) {
        res.status(statusCode).json(err);
    }
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        console.log(err);
        res.status(statusCode).send(err);
    };
}

function respondWith(res, statusCode) {
    statusCode = statusCode || 200;
    return function () {
        res.status(statusCode).end();
    };
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            console.log('Entity found');
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            console.log('Entity not found');
            res.status(404).end();
            return null;
        }
        return entity;
    };
}


function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.saveAsync()
            .spread(function (updated) {
                return updated;
            });
    };
}
var securityFieldsToExclude = '-salt -login -password -provider';

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
    User.findAsync({}, securityFieldsToExclude)
        .then(function (users) {
            res.status(200).json(users);
        })
        .catch(handleError(res));
};


// Gets a single User from the DB
exports.show = function (req, res) {

    User.findOneAsync({
            _id: req.params.id
        }, securityFieldsToExclude)
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

/**
 * Creates a new user
 */
exports.create = function (req, res) {
    req.body.security = {
        provider: 'local',
        role: 'user'
    };
    User.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
    User.findByIdAndRemoveAsync(req.params.id)
        .then(function () {
            res.status(204).end();
        })
        .catch(handleError(res));
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findByIdAsync(userId)
        .then(function (user) {
            if (user.authenticate(oldPass)) {
                user.password = newPass;
                return user.saveAsync()
                    .then(function () {
                        res.status(204).end();
                    })
                    .catch(validationError(res));
            } else {
                return res.status(403).end();
            }
        });
};

/**
 * Change a users profile
 */
exports.updateProfile = function (req, res, next) {

    console.log('update profile)');

    // security check
    var userId = req.params.id;

    console.log(req.params);

    if (req.user) {
        // only if user authenticated (to be able to disable security on routes globally)
        var currentUserId = req.user._id;
        if (req.user.role !== 'admin' && currentUserId !== userId) {
            return res.status(403).end();
        }
    }


    // do not update login/password/salt/provider
    delete req.body.login;
    delete req.body.password;
    delete req.body.salt;
    delete req.body.provider;

    console.log('Update user %s.', userId);

    User.findByIdAsync(userId)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

exports.patch = function (req, res) {

    var userId = req.params.id;

    User.findByIdAsync(userId).then(function (user) {

        var patches = req.body.patches;

        jsonpatch.apply(user, patches);

        user.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, user);
        });
    }, function (err) {
        return handleError(res, err);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/');
};