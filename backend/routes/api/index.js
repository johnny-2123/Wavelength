const router = require('express').Router();
const { restoreUser, setTokenCookie, requireAuth } = require("../../utils/auth.js");
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const roundRouter = require('./rounds.js');
const friendRouter = require('./friends.js');
const gameRouter = require('./games.js');
const wordRouter = require('./words.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/friends', friendRouter);

router.use('/games', gameRouter);

router.use('/rounds', roundRouter);

router.use('/words', wordRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);


if (process.env.NODE_ENV !== 'production') {
    router.get('/csrf/restore', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.status(201).json({});
    });
}


module.exports = router;
