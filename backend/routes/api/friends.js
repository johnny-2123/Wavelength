const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { User, Friend, Game } = require('../../db/models');
const { Op } = require('sequelize');

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
        return { status: 404, message: 'Friendship not found.' };

    if (friendShipSent && userId !== friendShipSent.RequestingUser.id)
        return { status: 401, message: 'Unauthorized.' };

    if (friendShipReceived && userId !== friendShipReceived.ReceivingUser.id)
        return { status: 401, message: 'Unauthorized.' };

    return null;
};

router.get('/:friendId/games', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { friendId } = req.params;
    const { friendShipSent, friendShipReceived } = await findFriendship(userId, friendId);

    const validationError = validateFriendship(userId, friendShipSent, friendShipReceived);
    if (validationError) return res.status(validationError.status).json({ errors: validationError.message });

    const games = await Game.findAll({
        where: {
            [Op.or]: [{ user1Id: userId, user2Id: friendId }, { user1Id: friendId, user2Id: userId }]
        },
        include: [{ model: User, as: 'user1' }, { model: User, as: 'user2' }]
    });

    res.status(200).json({ games });
}));

router.delete('/:friendId', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { friendId } = req.params;
    const { friendShipSent, friendShipReceived } = await findFriendship(userId, friendId);

    const validationError = validateFriendship(userId, friendShipSent, friendShipReceived);
    if (validationError) return res.status(validationError.status).json({ errors: validationError.message });

    const friendshipToDelete = friendShipSent || friendShipReceived;
    await friendshipToDelete.destroy();
    res.status(200).json({ message: 'Friendship deleted.', friendship: friendshipToDelete });
}));

router.put('/:friendId', requireAuth, asyncHandler(async (req, res) => {
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
        return res.status(200).json({ message: 'Friend request accepted.', friendship: friendShipReceived });
    }

    if (status === 'rejected' && friendShipReceived) {
        await friendShipReceived.destroy();
        return res.status(200).json({ message: 'Friend request rejected.', friendship: friendShipReceived });
    }
}));


router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { usercredential } = req.body;

    console.log('usercredential', usercredential);

    const friendUser = await User.findOne({
        where: {
            [Op.or]: [
                { username: usercredential },
                { email: usercredential }
            ]
        },
        attributes: ['id']
    });

    console.log('friendId', friendUser.id);

    const [friend, friendShipSent, friendShipReceived] = await Promise.all([
        User.findByPk(friendUser.id),
        Friend.findOne({ where: { userId, friendId: friendUser.id }, include: includeUsers }),
        Friend.findOne({ where: { userId: friendUser.id, friendId: userId }, include: includeUsers })
    ]);

    if (!friend)
        return res.status(404).json({ errors: 'Friend not found.' });

    if (friendShipSent)
        return res.status(400).json({ errors: 'Friendship already exists.' });

    if (friendShipReceived) {
        friendShipReceived.status = 'accepted';
        await friendShipReceived.save();
        return res.status(200).json({ message: 'Friend request accepted.', friendship: friendShipReceived });
    }

    const friendship = await Friend.create({ userId, friendId: friendUser.id, status: 'pending' });
    friendship.save();
    res.status(201).json({ message: `Friend request sent to ${friend.username}.` });
}));

router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const friendsStarted = await Friend.findAll({ where: { userId }, include: includeUsers });
    const friendsReceived = await Friend.findAll({ where: { friendId: userId }, include: includeUsers });
    const friends = friendsStarted.concat(friendsReceived);
    res.status(200).json({ friends });
}));

module.exports = router;
