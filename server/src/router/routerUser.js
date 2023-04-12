const express = require('express');
const validators = require('../middlewares/validators');
const checkToken = require('../middlewares/checkToken');
const userController = require('../controllers/userController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');

const routerUser = express.Router();


routerUser.post('/getUser', checkToken.checkAuth);

routerUser.use(checkToken.checkToken)

routerUser.post('/updateUser', upload.uploadAvatar, userController.updateUser);
routerUser.post('/pay', basicMiddlewares.onlyForCustomer, basicMiddlewares.parseBody, validators.validateContestCreation, userController.payment);
routerUser.post('/cashout', basicMiddlewares.onlyForCreative, userController.cashout);
routerUser.post('/changeMark', basicMiddlewares.onlyForCustomer, userController.changeMark);


module.exports = routerUser;