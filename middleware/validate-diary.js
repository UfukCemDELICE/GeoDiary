const { body, validationResult } = require('express-validator');
const rules = [
  body('title').trim().notEmpty().isLength({ max: 120 }),
  body('content').trim().notEmpty().isLength({ max: 5000 }),
  body('diaryDate').isISO8601().toDate(),
  body('longitude').isFloat({ min: -180, max: 180 }).toFloat(),
  body('latitude').isFloat({ min: -90, max: 90 }).toFloat(),
  body('locationName').optional({ checkFalsy: true }).trim().isLength({ max: 200 }),
];
function collectValidationErrors(req, _res, next) {
  req.validationErrors = validationResult(req).array();
  next();
}
module.exports = { diaryValidation: [...rules, collectValidationErrors] };
