const express = require('express');
const checkToken = require('../middlewares/checkToken');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');
const upload = require('../utils/fileUpload');

const routerContest = express.Router();

routerContest.use(checkToken.checkToken)

routerContest.post('/dataForContest', contestController.dataForContest);
routerContest.post('/getCustomersContests', contestController.getCustomersContests);
routerContest.get('/getContestById', basicMiddlewares.canGetContest, contestController.getContestById);
routerContest.post('/getAllContests', basicMiddlewares.onlyForCreative, contestController.getContests);
routerContest.post('/updateContestFiles', upload.uploadContestFiles, contestController.uploadFiles);
routerContest.post('/setOfferStatus', basicMiddlewares.onlyForCustomerWhoCreateContest, contestController.setOfferStatus);
routerContest.post('/setNewOffer', upload.uploadLogoFiles, basicMiddlewares.canSendOffer, contestController.setNewOffer);
routerContest.post('/uploadFiles', upload.uploadContestFiles, contestController.uploadFiles)
routerContest.get('/downloadFile/:fileName', contestController.downloadFile);
routerContest.post('/getOffers', contestController.getOffers)
routerContest.post('/setOfferModerStatus', basicMiddlewares.onlyForModerator, contestController.setOfferModerStatus)


module.exports = routerContest;