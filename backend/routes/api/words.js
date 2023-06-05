const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Word, Game, Round } = require('../../db/models');
const { Op } = require('sequelize');
const router = express.Router();

// get all words in all games between two users
router.get(
    '/:friendId',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const { friendId } = req.params;

        const games = await Game.findAll({
            where: {
                [Op.or]: [
                    { user1Id: userId, user2Id: friendId },
                    { user1Id: friendId, user2Id: userId },
                ]
            },
            include: [{
                model: Round,
                as: 'Round'
            }]
        });

        const roundIds = [];

        games.forEach(game => {
            game.Round.forEach(round => {
                roundIds.push(round.id);
            })
        })

        const words = await Word.findAll({
            where: {
                roundId: {
                    [Op.in]: roundIds
                }
            },
            attributes: ['wordText', 'userId']
        });


        return res.status(200).json({ words });

    }
)

router.get(
    '/',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const words = await Word.findAll({ where: { userId } });

        res.status(200).json({ words });
    });

module.exports = router;
