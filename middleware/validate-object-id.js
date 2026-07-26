const mongoose = require('mongoose');
module.exports = function validateObjectId(req, res, next) {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    const error = new Error('Diary not found');
    error.status = 404;
    return next(error);
  }
  return next();
};
