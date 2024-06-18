const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


// GET all cards
router.get('/', async (req, res) => {
    try {
        const cards = await prisma.card.findMany();
        res.json(cards);
    } catch (error) {
        console.error ('Error getting cards: ', error);
        res.status(500).json({ error: 'Error getting cards' });
    }
});

// GET card by board id
router.get('/byBoard/:boardId', async (req, res) => {
    const { boardId } = req.params;
    try {
        const cards = await prisma.card.findMany({
            where: { boardId: parseInt(boardId) }
        });
        res.json(cards);
    } catch (error) {
        console.error ('Error getting cards: ', error);
        res.status(500).json({ error: 'Error getting cards' });
    }
});

// POST (create) a new card
router.post('/', async (req, res) => {
    const { title, description, boardId } = req.body;
    try {
        const newCard = await prisma.card.create({
            data: { title, description, boardId: parseInt(boardId) }
        });
        res.status(201).json(newCard);
    } catch (error) {
        console.error ('Error creating card: ', error);
        res.status(500).json({ error: 'Error creating card' });
    }
});

//Delete card by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.card.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Card deleted' });
    } catch (error) {
        console.error ('Error deleting card: ', error);
        res.status(500).json({ error: 'Error deleting card' });
    }
});

module.exports = router;
