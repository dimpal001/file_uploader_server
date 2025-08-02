const express = require('express')
const morgan = require('morgan')
const uploadRoutes = require('./routes/uploadRoutes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(process.env.UPLOAD_DIR || 'uploads'))
app.use('/api/upload', uploadRoutes)
app.use(errorHandler)
module.exports = app
