const router = require('express').Router();
const { restoreUser, setTokenCookie, requireAuth } = require("../../utils/auth.js");
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);

router.get("/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});


module.exports = router;
