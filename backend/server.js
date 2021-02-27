import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './midleware/midlewareError.js'
import path from 'path'
import morgan from 'morgan'


dotenv.config()

connectDB()

const app = express()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/products', productRoutes)
app.use('/users', userRoutes)
app.use('/orders', orderRoutes)
app.use('/upload', uploadRoutes)

app.get('/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

app.use(notFound)

app.use(errorHandler)




const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))