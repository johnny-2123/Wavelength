const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { User, Friend, Game } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

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

router.get(
    '/:friendId/games',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const { friendId } = req.params;

        const [friendShipSent, friendShipReceived] = await Promise.all([
            Friend.findOne({
                where: { userId, friendId },
                include: includeUsers
            }),
            Friend.findOne({
                where: { userId: friendId, friendId: userId },
                include: includeUsers
            }),
        ]);

        if (!friendShipSent && !friendShipReceived) {
            return res.status(404).json({ errors: 'Friendship not found.' });
        }

        if (friendShipSent && userId !== friendShipSent.RequestingUser.id) {
            return res.status(401).json({ errors: 'Unauthorized.' });
        }

        if (friendShipReceived && userId !== friendShipReceived.ReceivingUser.id) {
            return res.status(401).json({ errors: 'Unauthorized.' });
        }

        const games = await Game.findAll({
            where: {
                [Op.or]: [
                    { user1Id: userId, user2Id: friendId },
                    { user1Id: friendId, user2Id: userId }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'user1'
                },
                {
                    model: User,
                    as: 'user2'
                }
            ]
        });

        res.status(200).json({ games });

    }
)

router.delete(
    '/:friendId',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const { friendId } = req.params;

        const [friendShipSent, friendShipReceived] = await Promise.all([
            Friend.findOne({
                where: { userId, friendId },
                include: includeUsers
            }),
            Friend.findOne({
                where: { userId: friendId, friendId: userId },
                include: includeUsers
            }),
        ]);

        if (!friendShipSent && !friendShipReceived) {
            return res.status(404).json({ errors: 'Friendship not found.' });
        }

        if (friendShipSent && userId !== friendShipSent.RequestingUser.id) {
            return res.status(401).json({ errors: 'Unauthorized.' });
        }

        if (friendShipReceived && userId !== friendShipReceived.ReceivingUser.id) {
            return res.status(401).json({ errors: 'Unauthorized.' });
        }

        if (friendShipSent) {
            await friendShipSent.destroy();
            return res.status(200).json({ message: `Friendship deleted.`, friendShipSent });
        }

        if (friendShipReceived) {
            await friendShipReceived.destroy();
            return res.status(200).json({ message: `Friendship deleted.`, friendShipReceived });
        }

    }
)

router.put(
    '/:friendId',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const { friendId } = req.params;
        const { status } = req.body;

        const [friend, friendShipSent, friendShipReceived] = await Promise.all([
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

        if (!friendShipSent && !friendShipReceived) {
            return res.status(404).json({ errors: 'Friendship not found.' });
        }

        if (status === "accepted") {
            if (friendShipReceived) {
                friendShipReceived.status = "accepted";
                await friendShipReceived.save();
                return res.status(200).json({ message: `Friend request accepted.`, friendShipReceived });
            }
        }

        if (status === "rejected") {
            if (friendShipReceived) {
                friendShipReceived.status = "rejected";
                await friendShipReceived.destroy();
                return res.status(200).json({ message: `Friend request rejected.`, friendShipReceived });
            }
        }
    }
)

router.post(
    '/',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const { friendId } = req.body;

        const [friend, friendShipSent, friendShipReceived] = await Promise.all([
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

        if (friendShipSent) {
            return res.status(400).json({ errors: 'Friendship already exists.' });
        }

        if (friendShipReceived) {
            friendShipReceived.status = "accepted";
            await friendShipReceived.save();
            return res.status(200).json({ message: `Friend request from accepted.`, friendShipReceived });
        }

        const friendship = await Friend.create({ userId, friendId, status: "pending" });
        friendship.save();

        return res.status(201).json({ message: `Friend request sent to ${friend.username}.` });
    }
)

router.get(
    '/',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const friendsStarted = await Friend.findAll({
            where: { userId },
            include: includeUsers
        });

        const friendsReceived = await Friend.findAll({
            where: { friendId: userId },
            include: includeUsers
        });

        const friends = friendsStarted.concat(friendsReceived);

        res.status(200).json({ friends });
    }
)

module.exports = router;
