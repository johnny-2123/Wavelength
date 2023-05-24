const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Friend } = require('../../db/models');

const router = express.Router();

router.post('/add', asyncHandler(async (req, res) => {
    const { userId, friendId } = req.body;
    const friendship = await Friend.create({ userId, friendId, status: "pending" });
    res.status(200).json({ message: 'Friend request sent.', friendship });
}));

router.get('/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const friendships = await Friend.findAll({ where: { userId } });
    res.status(200).json({ friendships });
}));

module.exports = router;
