const crypto = require('node:crypto');
function csrfProtection(req, res, next) {
  if (!req.session.csrfToken) req.session.csrfToken = crypto.randomBytes(32).toString('hex');
  res.locals.csrfToken = req.session.csrfToken;
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  if (req.is('multipart/form-data') && !req.body?._csrf) return next();
  const supplied = req.body?._csrf || req.get('x-csrf-token');
  const expected = req.session.csrfToken;
  if (
    !supplied ||
    supplied.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))
  ) {
    const error = new Error('Invalid CSRF token');
    error.status = 403;
    return next(error);
  }
  return next();
}
module.exports = csrfProtection;
