function callback(_req, res) {
  res.redirect('/diaries');
}
function logout(req, res, next) {
  req.logout((error) => {
    if (error) return next(error);
    req.session.destroy((sessionError) => (sessionError ? next(sessionError) : res.redirect('/')));
  });
}
module.exports = { callback, logout };
