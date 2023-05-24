const express = require('express');
const asyncHandler = require('express-async-handler');

const { Word } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { userId, wordDetails } = req.body;
    const word = await Word.createWord(userId, wordDetails);
    res.status(201).json({ word });
}));

router.get('/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const words = await Word.getWords(userId);
    res.status(200).json({ words });
}));

module.exports = router;
