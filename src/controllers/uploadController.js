const fs = require('fs')
const path = require('path')

exports.handleUpload = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

  const folder = req.uploadFolder || 'temp'
  const fileName = req.uploadedFileName || req.file.filename
  const fileUrl = `/uploads/${folder}/${fileName}`

  res.status(200).json({
    message: 'File uploaded successfully',
    file: {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: fileUrl,
    },
  })
}

exports.handleDelete = (req, res) => {
  const { url } = req.body

  if (!url) {
    return res.status(400).json({ error: 'File URL is required' })
  }

  const cleanedUrl = url.startsWith('/') ? url.slice(1) : url

  const safeBase = path.resolve(__dirname, '..', '..', 'uploads')
  const fullPath = path.resolve(__dirname, '..', '..', cleanedUrl)

  if (!fullPath.startsWith(safeBase)) {
    return res.status(400).json({ error: 'Invalid file path' })
  }

  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error('Error deleting file:', err)
      return res.status(500).json({ error: 'File deletion failed' })
    }

    res.status(200).json({ message: 'File deleted successfully' })
  })
}
