const express = require('express')
const { PrismaClient } = require('@prisma/client')
const cors = require('cors')


const app = express()
const prisma = new PrismaClient()
const port = process.env.PORT || 3002

const config = require('./config');

// Use the DATABASE_HOSTED_URL variable here
const dbUrl = config.DATABASE_HOSTED_URL;

app.use(cors())
app.use(express.json())


// Routes

const boardRoutes = require('./routes/boardRoutes')
const cardRoutes = require('./routes/cardRoutes')

app.use('/api/boards', boardRoutes);
app.use('/api/cards', cardRoutes);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost${port}`)
});
