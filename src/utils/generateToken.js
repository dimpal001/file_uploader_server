const jwt = require('jsonwebtoken')
require('dotenv').config()

const payload = {
  id: 'admin',
  role: 'uploader',
}

const token = jwt.sign(payload, process.env.JWT_SECRET, {})

console.log('Generated Token:', token)
