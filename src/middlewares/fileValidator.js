module.exports = function (req, res, next) {
  if (!req.file) return res.status(400).json({ error: 'File is required' });
  const allowedTypes = [
    'image/png', 'image/jpeg', 'application/pdf', 'text/plain',
    'application/zip', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(415).json({ error: 'Unsupported file type' });
  }
  next();
};
