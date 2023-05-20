const router = require('express').Router();
const { restoreUser, setTokenCookie, requireAuth } = require("../../utils/auth.js");
const { User } = require('../../db/models');
router.use(restoreUser);

router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);

router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);

router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'demoEdgar'
        }
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    setTokenCookie(res, user);
    return res.json({ user: wuser });
});

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
