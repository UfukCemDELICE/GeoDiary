const path = require('node:path');
const crypto = require('node:crypto');
const multer = require('multer');
const allowed = new Set(['image/jpeg', 'image/png', 'image/webp']);
function createUpload(config) {
  const storage = multer.diskStorage({
    destination: config.uploadDirectory,
    filename: (_req, file, cb) =>
      cb(null, `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`),
  });
  return multer({
    storage,
    limits: { fileSize: config.maxUploadBytes },
    fileFilter: (_req, file, cb) => {
      if (allowed.has(file.mimetype)) return cb(null, true);
      const error = new Error('Only JPEG, PNG, and WebP images are supported');
      error.status = 415;
      return cb(error);
    },
  });
}
module.exports = { createUpload, allowedImageTypes: allowed };
