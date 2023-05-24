const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Word } = require('../../db/models');

const router = express.Router();

router.get(
    '/',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const words = await Word.findAll({ where: { userId } });

        res.status(200).json({ words });
    });

module.exports = router;
