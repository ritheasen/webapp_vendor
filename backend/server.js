'use strict'
const express = require('express')
const socket = require('socket.io')
const app = express()
const cors = require('cors')
const dotevn = require('dotenv').config()
const connectDB = require('./config/db')

const { errorHandler } = require('./middleware/errorMiddleware')

const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', userRoute)
app.use('/api/products', productRoute)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
    })

const io = socket(app.listen(process.env.SOCKET, () => {
    console.log(`Scoket ${process.env.SOCKET}`)
}))

io.on('connection', (socket) => {
    
    console.log(`New connection ${socket.id}`);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        io.sockets.emit('typing', data)
    })

    socket.on('disconnect', () => {
        console.log(`Disconnected ${socket.id}`);
    })
})