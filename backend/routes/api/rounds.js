const express = require('express');
const asyncHandler = require('express-async-handler');

const { Round } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { gameId } = req.body;
    const round = await Round.create({ gameId, user1Agrees: false, user2Agrees: false });
    res.status(201).json({ round });
}));

router.get('/:gameId', asyncHandler(async (req, res) => {
    const { gameId } = req.params;
    const rounds = await Round.findAll({ where: { gameId } });
    res.status(200).json({ rounds });
}));

module.exports = router;
