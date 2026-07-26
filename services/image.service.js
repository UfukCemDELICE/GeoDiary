const fs = require('node:fs/promises');
function metadataFromUpload(file) {
  if (!file) return undefined;
  return {
    url: `/uploads/${file.filename}`,
    storageKey: file.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
  };
}
async function removeLocalImage(storageKey, uploadDirectory) {
  if (storageKey)
    await fs.unlink(`${uploadDirectory}/${storageKey}`).catch((error) => {
      if (error.code !== 'ENOENT') throw error;
    });
}
module.exports = { metadataFromUpload, removeLocalImage };
