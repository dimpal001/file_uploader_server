const express = require('express')
const upload = require('../config/multerConfig')
const {
  handleUpload,
  handleDelete,
} = require('../controllers/uploadController')
const fileValidator = require('../middlewares/fileValidator')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()
router.post(
  '/',
  authMiddleware,
  upload.single('file'),
  fileValidator,
  handleUpload
)
router.delete('/', authMiddleware, handleDelete)
module.exports = router
