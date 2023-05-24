const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { User, Friend } = require('../../db/models');

const router = express.Router();

router.put(
    '/:friendId',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const { friendId } = req.params;
        const { status } = req.body;

        const friend = await Friend.findOne({
            where: { userId, friendId },
            include: includeUsers
        });

        if (!friend) {
            return res.status(404).json({ errors: 'Friend not found.' });
        }

        friend.status = status;
        await friend.save();

        return res.status(200).json({ friend });
    }
)

const includeUsers = [
    {
        model: User,
        as: 'RequestingUser',
    },
    {
        model: User,
        as: 'ReceivingUser',
    }
];

router.post(
    '/',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const { friendId } = req.body;

        const [friend, existingFriendship, friendRequested] = await Promise.all([
            User.findByPk(friendId),
            Friend.findOne({
                where: { userId, friendId },
                include: includeUsers
            }),
            Friend.findOne({
                where: { userId: friendId, friendId: userId },
                include: includeUsers
            }),
        ]);

        if (!friend) {
            return res.status(404).json({ errors: 'Friend not found.' });
        }

        if (existingFriendship) {
            return res.status(400).json({ errors: 'Friendship already exists.' });
        }

        if (friendRequested) {
            friendRequested.status = "accepted";
            await friendRequested.save();
            const friendship = await Friend.create({ userId, friendId, status: "accepted" });

            return res.status(200).json({ message: `Friend request accepted.`, friendship });
        }

        const friendship = await Friend.create({ userId, friendId, status: "pending" });

        res.status(200).json({ message: `Friend request sent to ${friend.username}.`, friendship });
    }
)

router.get(
    '/',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const friends = await Friend.findAll({
            where: { userId },
            include: includeUsers
        });

        res.status(200).json({ friends });
    }
)

module.exports = router;
