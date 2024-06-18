const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

// GET all boards

router.get('/', async (req, res) => {
    try {
        const boards = await prisma.board.findMany();
        res.json(boards);
    } catch (error) {
        console.error('There is an error fetching boards: ', error);
        res.status(500).json({ error: 'There was an error fetching boards' });
    }
});

//Get board by id

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const board = await prisma.board.findUnique({
            where: { id: parseInt(id) }
        });
        if (!board) {
            return res.status(404).json({ msg: 'Board not found' });
        }
        res.json(board);
    } catch (error) {
        console.error('There is an error fetching board: ', error);
        res.status(500).json({ error: 'There was an error fetching board' });
    }
});

// POST (create) a new board

router.post('/', async (req, res) => {
    const { title, description, author } = req.body;
    try {
        const newBoard = await prisma.board.create({
            data: { title, description, author }
        });
        res.status(201).json(newBoard);
    } catch (error) {
        console.error('There is an error creating a new board: ', error);
        res.status(500).json({ error: 'There was an error creating a new board' });
    }
});

//Delete a board by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.board.delete({
            where: { id: parseInt(id) }
        });
        res.json({ msg: 'Board deleted' });
    } catch (error) {
        console.error('There is an error deleting a board: ', error);
        res.status(500).json({ error: 'There was an error deleting a board' });
    }
});

module.exports = router;
