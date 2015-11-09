'use strict';

import express from 'express';
import controller from './user.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.delete('/:id'/*, auth.hasRole('admin')*/, controller.destroy);
router.get('/:id'/*, auth.isAuthenticated()*/, controller.show);
router.put('/:id/password'/*, auth.isAuthenticated()*/, controller.changePassword);
router.put('/:id'/*, auth.isAuthenticated()*/, controller.updateProfile);
router.post('/'/*, auth.hasRole('admin')*/, controller.create);

module.exports = router;
