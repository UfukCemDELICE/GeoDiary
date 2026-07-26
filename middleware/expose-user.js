module.exports = function exposeUser(req, res, next) {
  res.locals.currentUser = req.user || null;
  next();
};
