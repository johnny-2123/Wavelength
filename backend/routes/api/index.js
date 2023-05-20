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


// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'demoEdgar'
//         }
//     });

//     if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//     }

//     setTokenCookie(res, user);
//     return res.json({ user: wuser });
// });

// router.post('/test', function (req, res) {
//     res.json({ requestBody: req.body });
// });

module.exports = router;
