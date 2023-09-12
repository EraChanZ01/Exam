const express = require('express');
const routerAuth = require("./routerAuth")
const routerContest = require('./routerContest')
const routerUser = require('./routerUser')
const routerChat = require('./routerChat')
const router = express.Router();


router.use('/auth',routerAuth)
router.use('/contest', routerContest)
router.use('/user',routerUser)
router.use('/chat',routerChat)


module.exports = router;
