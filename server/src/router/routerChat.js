const express = require('express');
const chatController = require('../controllers/chatController');
const checkToken = require('../middlewares/checkToken');

const routerContest = express.Router();

routerContest.use(checkToken.checkToken)

routerContest.post('/newMessage', chatController.addMessage);
routerContest.post('/getChat', chatController.getChat);
routerContest.post('/getPreview', chatController.getPreview);
routerContest.post('/blackList', chatController.blackList);
routerContest.post('/favorite', chatController.favoriteChat);
routerContest.post('/updateNameCatalog', chatController.updateNameCatalog);
routerContest.post('/createCatalog', chatController.createCatalog);
routerContest.post('/addNewChatToCatalog', chatController.addNewChatToCatalog);
routerContest.post('/removeChatFromCatalog', chatController.removeChatFromCatalog);
routerContest.post('/deleteCatalog', chatController.deleteCatalog);
routerContest.post('/getCatalogs', chatController.getCatalogs);

module.exports = routerContest;
