const express = require('express');
const routerAuth = require("./routerAuth")
const routerContest = require('./routerContest')
const routerUser = require('./routerUser')
const routerChat = require('./routerChat')
const router = express.Router();


router.use(routerAuth)
router.use(routerContest)
router.use(routerUser)
router.use(routerChat)


module.exports = router;
