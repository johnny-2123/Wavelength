const express = require('express');
const asyncHandler = require('express-async-handler');
const { Game } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { user1Id, user2Id } = req.body;
    const game = await Game.create({ user1Id, user2Id, gameOver: false });
    res.status(201).json({ game });
}));

router.get('/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const gamesStarted = await Game.findAll({ where: { user1Id: userId } });
    const gamesJoined = await Game.findAll({ where: { user2Id: userId } });
    res.status(200).json({ gamesStarted, gamesJoined });
}));

module.exports = router;
