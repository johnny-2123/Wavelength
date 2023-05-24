const express = require('express');
const asyncHandler = require('express-async-handler');

const { Round } = require('../../db/models');

const router = express.Router();

router.put(
    '/:roundId',
    async (req, res) => {
        const { roundId } = req.params;
        const { user1Agrees, user2Agrees } = req.body;
        const round = await Round.findByPk(roundId);

        if (!round) {
            return res.status(404).json({ errors: 'Round not found.' });
        }

        if (user1Agrees) { round.user1Agrees = user1Agrees }

        if (user2Agrees) { round.user2Agrees = user2Agrees }

        await round.save();

        return res.status(200).json({ round });
    }
);

router.get(
    '/:roundId',
    async (req, res) => {
        const { roundId } = req.params;
        const round = await Round.findByPk(roundId);
        res.status(200).json({ round });
    }

);

module.exports = router;
