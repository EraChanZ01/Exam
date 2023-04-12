const express = require('express');
const validators = require('../middlewares/validators');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');

const routerAuth = express.Router();


routerAuth.post('/registration', validators.validateRegistrationData, hashPass, userController.registration);
routerAuth.post('/login', validators.validateLogin, userController.login);



module.exports = routerAuth;