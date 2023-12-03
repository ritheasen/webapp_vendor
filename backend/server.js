'use strict'
const express = require('express')
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