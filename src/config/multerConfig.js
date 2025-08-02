const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const baseUploadDir = process.env.UPLOAD_DIR || 'uploads'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = req.body.folder || req.query.folder || 'temp'
    const targetDir = path.join(baseUploadDir, folder)

    fs.mkdirSync(targetDir, { recursive: true })

    req.uploadFolder = folder

    cb(null, targetDir)
  },

  filename: function (req, file, cb) {
    const uniqueName = uuidv4() + path.extname(file.originalname)
    req.uploadedFileName = uniqueName
    cb(null, uniqueName)
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'),
  },
})

module.exports = upload
