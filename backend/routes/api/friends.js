const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { User, Friend, Game, Round, Word } = require('../../db/models');
const { Op } = require('sequelize');
const moment = require('moment');

const router = express.Router();

const includeUsers = [
    { model: User, as: 'RequestingUser' },
    { model: User, as: 'ReceivingUser' }
];

const findFriendship = async (userId, friendId) => {
    const [friendShipSent, friendShipReceived] = await
        Promise.all([
            Friend.findOne({ where: { userId, friendId }, include: includeUsers }),
            Friend.findOne({ where: { userId: friendId, friendId: userId }, include: includeUsers })
        ]);

    return { friendShipSent, friendShipReceived };
};

const validateFriendship = (userId, friendShipSent, friendShipReceived) => {
    if (!friendShipSent && !friendShipReceived)
        return { status: 404, errors: ['Friendship not found.'] };

    if (friendShipSent && userId !== friendShipSent.RequestingUser.id)
        return { status: 401, errors: ['Unauthorized.'] };

    if (friendShipReceived && userId !== friendShipReceived.ReceivingUser.id)
        return { status: 401, errors: ['Unauthorized.'] };

    return null;
};

router.get(
    '/top',
    requireAuth,
    (
        async (req, res) => {
            const userId = req.user.id;
            const oneWeekAgo = moment().subtract(7, 'days').toDate();

            const games = await Game.findAll({
                where: {
                    [Op.or]: [
                        { user1Id: userId },
                        { user2Id: userId }
                    ],
                    createdAt: {
                        [Op.gte]: oneWeekAgo
                    }
                },
                attributes: ['id', 'user1Id', 'user2Id'],
                include: [
                    { model: User, as: 'user1' },
                    { model: User, as: 'user2' }
                ]
            });

            const gamesWithFriends = {};
            games.forEach(game => {
                const friendId = game.user1Id === userId ? game.user2Id : game.user1Id;
                gamesWithFriends[friendId] = (gamesWithFriends[friendId] || 0) + 1;
            });

            const sortedFriends = Object.keys(gamesWithFriends).sort((a, b) => gamesWithFriends[b] - gamesWithFriends[a]);

            const friends = await User.findAll({
                where: {
                    id: {
                        [Op.in]: sortedFriends.slice(0, 3)
                    }
                }
            });

            res.status(200).json({ friends: friends });
        }
    )
);


router.get('/:friendId/games', requireAuth, (async (req, res) => {
    const userId = req.user.id;
    const { friendId } = req.params;
    const { friendShipSent, friendShipReceived } = await findFriendship(userId, friendId);

    const validationError = validateFriendship(userId, friendShipSent, friendShipReceived);
    if (validationError) return res.status(validationError.status).json({ errors: validationError.message });

    const games = await Game.findAll({
        where: {
            [Op.or]: [{ user1Id: userId, user2Id: friendId }, { user1Id: friendId, user2Id: userId }]
        },
        include: [
            { model: User, as: 'user1' }, { model: User, as: 'user2' }, {
                model: Round,
                as: 'Round',
                include: [
                    {
                        model: Word
                    }
                ]
            }]
    });

    res.status(200).json({ games });
}));

router.get('/:friendId', requireAuth, (async (req, res) => {
    const userId = req.user.id;
    const { friendId } = req.params;
    const { friendShipSent, friendShipReceived } = await findFriendship(userId, friendId);

    const validationError = validateFriendship(userId, friendShipSent, friendShipReceived);

    if (validationError) return res.status(validationError.status).json({ errors: validationError.message });

    const friend = friendShipSent ? friendShipSent.ReceivingUser : friendShipReceived.RequestingUser;

    if (friendShipSent) {
        friend.setDataValue('status', friendShipSent.status);
    } else {
        friend.setDataValue('status', friendShipReceived.status);
    }

    res.status(200).json({ friend });
}))

router.delete('/:friendId', requireAuth, (async (req, res) => {
    const userId = req.user.id;
    const { friendId } = req.params;
    const { friendShipSent, friendShipReceived } = await findFriendship(userId, friendId);

    const validationError = validateFriendship(userId, friendShipSent, friendShipReceived);
    if (validationError) return res.status(validationError.status).json({ errors: validationError.message });

    const friendshipToDelete = friendShipSent || friendShipReceived;
    await friendshipToDelete.destroy();
    res.status(200).json({ message: 'Friendship deleted.', friendship: friendshipToDelete });
}));

router.put('/:friendId', requireAuth, (async (req, res) => {
    const userId = req.user.id;
    const { friendId } = req.params;
    const { status } = req.body;

    const [friend, friendShipSent, friendShipReceived] = await Promise.all([
        User.findByPk(friendId),
        Friend.findOne({ where: { userId, friendId }, include: includeUsers }),
        Friend.findOne({ where: { userId: friendId, friendId: userId }, include: includeUsers })
    ]);

    if (!friend)
        return res.status(404).json({ errors: 'Friend not found.' });

    const validationError = validateFriendship(userId, friendShipSent, friendShipReceived);
    if (validationError) return res.status(validationError.status).json({ errors: validationError.message });

    if (status === 'accepted' && friendShipReceived) {
        friendShipReceived.status = 'accepted';
        await friendShipReceived.save();
        return res.status(200).json({ message: [`Friend request from ${friend.username} accepted.`], friendship: friendShipReceived });
    }

    if (status === 'rejected' && friendShipReceived) {
        await friendShipReceived.destroy();
        return res.status(200).json({ message: ['Friend request rejected.'], friendship: friendShipReceived });
    }

    return res.status(400).json({ errors: ['Invalid request.'] });
}));


router.post('/',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const { friendCredential } = req.body;
        const friend = await User.findOne({
            where: {
                [Op.or]: [
                    { username: friendCredential },
                    { email: friendCredential }
                ]
            },
            attributes: ['id', 'username']
        });

        if (!friend) {
            return res.status(404).json({ errors: ['Friend not found.'] });
        }

        const [friendShipSent, friendShipReceived] = await Promise.all([

            Friend.findOne({ where: { userId, friendId: friend.id }, include: includeUsers }),
            Friend.findOne({ where: { userId: friend.id, friendId: userId }, include: includeUsers })
        ]);


        if (friendShipSent && friendShipSent.status === 'accepted') {
            return res.status(400).json({ errors: ['You are already friends with this user'] });
        }

        if (friendShipSent)
            return res.status(400).json({ errors: ['Friendship already sent.'] });

        if (friendShipReceived && friendShipReceived.status === 'accepted') {
            return res.status(400).json({ errors: ['You are already friends with this user'] });
        }

        if (friendShipReceived) {
            friendShipReceived.status = 'accepted';
            await friendShipReceived.save();
            return res.status(200).json({ message: [`Friend request from ${friend.username} accepted.`], friendship: friendShipReceived });
        }

        const friendship = await Friend.create({ userId, friendId: friend.id, status: 'pending' });
        friendship.save();
        res.status(201).json({ message: [`Friend request sent to ${friend.username}.`] });
    }
);

router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const friendsStarted = await Friend.findAll({ where: { userId }, include: includeUsers });
    const friendsReceived = await Friend.findAll({ where: { friendId: userId }, include: includeUsers });
    const friends = friendsStarted.concat(friendsReceived);
    res.status(200).json({ friends });
}));

module.exports = router;
