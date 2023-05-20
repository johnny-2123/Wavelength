// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const { setTokenCookie } = require('../utils/auth.js')
const { User } = require('../db/models')
const { restoreUser } = require('../utils/auth.js')

router.use('/api', apiRouter);
router.use(restoreUser);


module.exports = router;
