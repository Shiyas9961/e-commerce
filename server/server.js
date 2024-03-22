require('dotenv').config()
const express = require('express')
const { connecteDB } = require('./config/connenctDB')
const app = express()
const PORT = process.env.PORT || 5500
const path = require('path')
const  mongoose = require('mongoose')
const productRoutes = require('./routes/productRoute')
const authRoute = require('./routes/authRoutes')
const orderRoute = require('./routes/orderRoutes')
const paymentRoute = require('./routes/paymentRoutes')
const { errorHandler } = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { corsOptions } = require('./config/corsOptions')
const { credentials } = require('./middlewares/credentials')

connecteDB()

app.use(credentials)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/api/v1', productRoutes)
app.use('/api/v1', authRoute)
app.use('/api/v1', orderRoute)
app.use('/api/v1', paymentRoute)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
    })
}


app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log("Database connencted successfully")
    app.listen(PORT, () => console.log(`Server is connected in PORT no. ${PORT} environment is ${process.env.NODE_ENV}`))
})

mongoose.connection.on('error', (error) => {
    console.log(error)
    process.exit(1)
})

process.on('uncaughtException', () => {
    process.exit(1)
})

