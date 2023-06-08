const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Game, Round, Word, User } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

router.get(
    '/recentGame',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;

        const mostRecentGame = await Game.findOne({
            where: {
                [Op.or]: [
                    { user1Id: userId },
                    { user2Id: userId }
                ]
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 1,
            include: [
                {
                    model: Round,
                    as: 'Round',
                    include: [
                        {
                            model: Word
                        }
                    ]
                },
                {
                    model: User,
                    as: 'user1',
                },
                {
                    model: User,
                    as: 'user2',
                }
            ]
        });

        if (!mostRecentGame) {
            return res.status(404).json({ errors: 'Game not found.' });
        }

        return res.status(200).json({ game: mostRecentGame });
    }

)

router.get(
    '/:gameId/rounds',
    async (req, res) => {
        const { gameId } = req.params;
        const rounds = await Round.findAll({ where: { gameId } });

        res.status(200).json({ rounds });
    }
);

router.post(
    '/:gameId/rounds',
    async (req, res) => {
        const { gameId } = req.params;
        const lastRound = await Round.findOne({
            order: [
                ['createdAt', 'DESC']
            ],
            where: { gameId },
            include: [{ model: Word }]
        });

        if (lastRound && lastRound?.Words?.length < 2) {
            return res.status(201).json({ round: lastRound });
        }

        if (lastRound && (lastRound.user1Agrees && lastRound.user2Agrees)) {
            return res.status(201).json({ round: lastRound });
        }

        if (lastRound && (!lastRound?.user1Ready || !lastRound?.user2Ready)) {
            return res.status(201).json({ round: lastRound });
        }

        const round = await Round.create({ gameId, user1Agrees: false, user2Agrees: false });
        res.status(201).json({ round });
    }
);

router.put(
    '/:gameId',
    requireAuth,
    async (req, res) => {
        const { gameId } = req.params;
        const { gameOver } = req.body;

        const game = await Game.findByPk(gameId,
            {
                include: [
                    {
                        model: Round,
                        as: 'Round',
                        include: [
                            {
                                model: Word
                            }
                        ]
                    },
                    {
                        model: User,
                        as: 'user1',
                    },
                    {
                        model: User,
                        as: 'user2',
                    }
                ]
            }
        );

        if (!game) {
            return res.status(404).json({ errors: 'Game not found.' });
        }

        if (game.user1Id !== req.user.id && game.user2Id !== req.user.id) {
            return res.status(401).json({ errors: 'Unauthorized.' });
        }

        if (gameOver) {
            game.gameOver = gameOver;
        }

        await game.save();

        return res.status(200).json({ game });

    }
)

router.delete(
    '/:gameId',
    requireAuth,
    async (req, res) => {
        const { gameId } = req.params;
        const game = await Game.findByPk(gameId);

        if (!game) {
            return res.status(404).json({ errors: 'Game not found.' });
        }

        if (game.user1Id !== req.user.id && game.user2Id !== req.user.id) {
            return res.status(401).json({ errors: 'Unauthorized.' });
        }

        await game.destroy();
        res.status(200).json({ message: `Game ${game.id} deleted.`, game: game });
    }
);

router.get(
    '/:gameId',
    requireAuth,
    async (req, res) => {
        const { gameId } = req.params;
        const game = await Game.findByPk(gameId,
            {
                include: [
                    {
                        model: Round,
                        as: 'Round',
                        include: [
                            {
                                model: Word
                            }
                        ]
                    },
                    {
                        model: User,
                        as: 'user1',
                    },
                    {
                        model: User,
                        as: 'user2',
                    }
                ]
            }

        );

        if (!game) {
            return res.status(404).json({ errors: 'Game not found.' });
        }

        if (game.user1Id !== req.user.id && game.user2Id !== req.user.id) {
            return res.status(401).json({ errors: 'Unauthorized.' });
        }

        return res.status(200).json({ game });
    }
);

router.post(
    '/',
    requireAuth,
    async (req, res) => {
        const { user1Id, user2Id } = req.body;

        if (user1Id && user2Id) {
            const game = await Game.create({ user1Id, user2Id, gameOver: false });
            return res.status(201).json({ game });
        } else {
            return res.status(400).json({ errors: 'Invalid request.' });
        }
    }
);

router.get(
    '/',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;

        const gamesStarted = await Game.findAll(
            {
                where: { user1Id: userId },
                include: [
                    {
                        model: User,
                        as: 'user2',
                    }
                ]
            });
        const gamesJoined = await Game.findAll({
            where: { user2Id: userId },
            include: [
                {
                    model: User,
                    as: 'user1',
                }
            ]
        });

        const games = Array.from(new Set([...gamesStarted, ...gamesJoined]));

        if (games.length === 0) {
            return res.status(200).json({ games: [] });
        }

        return res.status(200).json({ games });
    }
);

module.exports = router;
