const express = require('express')
const { PrismaClient } = require('@prisma/client')
const cors = require('cors')
const router = express.Router()


const app = express()
const port = process.env.PORT || 3002



app.use(cors())
app.use(express.json())


// Routes
app.get('/', (req, res) => {
    res.send('Hello World! I am the server!')
})

app.get('/api/boards', (req, res) => {
    res.send('Hello World! I am the server!')
})




const boardRoutes = require('./routes/boardRoutes')
const cardRoutes = require('./routes/cardRoutes')

app.use('/api/boards', boardRoutes);
app.use('/api/cards', cardRoutes);



app.listen(port, () => {
    console.log(`Server is running on port http://localhost${port}`)
});
