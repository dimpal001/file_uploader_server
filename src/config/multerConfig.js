const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const baseUploadDir = path.resolve(process.env.UPLOAD_DIR || "uploads");

const ALLOWED_FOLDERS = [
  "temp",
  "school-manager",
  "students",
  "teachers",
  "profiles",
  "documents",
];

const getSafeFolder = (folder) => {
  if (!folder) return "temp";
  return ALLOWED_FOLDERS.includes(folder) ? folder : "temp";
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const folder = getSafeFolder(req.body.folder);
    req.uploadFolder = folder;

    const targetDir = path.join(baseUploadDir, folder);

    if (!targetDir.startsWith(baseUploadDir)) {
      return cb(new Error("Invalid upload path"));
    }

    fs.mkdirSync(targetDir, { recursive: true });
    cb(null, targetDir);
  },

  filename(req, file, cb) {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    req.uploadedFileName = uniqueName;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE || 5242880),
  },
});

module.exports = upload;
