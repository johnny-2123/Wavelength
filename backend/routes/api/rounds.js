const express = require('express');
const asyncHandler = require('express-async-handler');

const { Round, Game, Word, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.post(
    '/:roundId/words',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const { roundId } = req.params;
        const { wordText } = req.body;

        console.log('###################################################################')

        const round = await Round.findByPk(roundId,
            {
                include: [
                    { model: Game },
                    { model: Word }
                ]
            }
        );

        if (!round) {
            return res.status(404).json({ errors: 'Round not found.' });
        }

        if (round.Game.user1Id !== req.user.id && round.Game.user2Id !== req.user.id) {
            return res.status(401).json({ errors: 'Unauthorized.' });
        }

        console.log('round', round)

        if (round.Words.length >= 2) {
            return res.status(400).json({ errors: 'Round already has two words.' });
        }

        const word = await Word.create({ userId, roundId, wordText });

        return res.status(201).json({ word });

    }
)

router.delete(
    '/:roundId',
    requireAuth,
    async (req, res) => {
        const { roundId } = req.params;
        console.log('###################################################################')
        console.log('roundId', roundId)

        const round = await Round.findByPk(roundId, {
            include: [
                { model: Game },
            ]
        });

        if (!round) {
            return res.status(404).json({ errors: 'Round not found.' });
        }

        if (round.Game.user1Id !== req.user.id && round.Game.user2Id !== req.user.id) {
            return res.status(401).json({ errors: 'Unauthorized.' });
        }

        await round.destroy();

        return res.status(200).json({ message: `Round ${round.id} deleted.` });
    }
)

router.put(
    '/:roundId',
    requireAuth,
    async (req, res) => {
        const { roundId } = req.params;
        const { user1Agrees, user2Agrees } = req.body;

        const round = await Round.findByPk(roundId);

        if (!round) {
            return res.status(404).json({ errors: 'Round not found.' });
        }

        if (user1Agrees === true || user1Agrees === false) {
            console.log('changing user1Agrees')
            round.user1Agrees = user1Agrees
        }

        if (user2Agrees === true || user2Agrees === false) {
            console.log('changing user2Agrees')
            round.user2Agrees = user2Agrees
        }

        await round.save();

        return res.status(200).json({ round });
    }
);

router.get(
    '/:roundId',
    requireAuth,
    async (req, res) => {
        const { roundId } = req.params;
        const round = await Round.findByPk(roundId, {
            include: [
                {
                    model: Game
                },
                {
                    model: Word,
                    include: {
                        model: User
                    }
                }
            ]
        });
        res.status(200).json({ round });
    }
);

module.exports = router;
