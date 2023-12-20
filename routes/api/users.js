const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.post('/ps', usersCtrl.createPS);
router.post('/org', usersCtrl.createOrg);
// POST /api/users/login
router.post('/login', usersCtrl.login);
// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
// GET /api/users/orgs
router.get('/orgs', usersCtrl.index);
// GET /api/users/orgs/
router.get('/orgs/:id', usersCtrl.getById);


module.exports = router; 