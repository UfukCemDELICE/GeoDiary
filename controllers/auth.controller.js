const User = require('../models/User');
function callback(_req, res) {
  res.redirect('/diaries');
}
function logout(req, res, next) {
  req.logout((error) => {
    if (error) return next(error);
    req.session.destroy((sessionError) => (sessionError ? next(sessionError) : res.redirect('/')));
  });
}
async function guestLogin(req, res, next) {
  try {
    const user = await User.findOneAndUpdate(
      { googleId: 'guest-explorer' },
      {
        $set: {
          displayName: 'Guest Explorer',
          email: 'guest@geodiary.local',
          avatarUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAkdS2kgu3HsnbHhGt_fSS3whpBnCYVdEpHVKEM4IVKq5BN1UNrbm4N_ygvJSjm8YItrcWxcpAIRLDP9iUxUddvgQe_mPeUxbSwxd88izaYAmxZy32uRAOCqXC5VAw-oQO5m4gFhmKF3mvoBfIJfp8_xmI-mniy7TWQw7D6uHQfhDtI9vQ8ouWIxO3u_QG2VsmMTBOAggMcwx_QIIZE__Zyot3QwBSy6wKJ49_e2jVrODoX2g-mU76V',
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    req.login(user, (error) => {
      if (error) return next(error);
      res.redirect('/diaries');
    });
  } catch (error) {
    next(error);
  }
}
module.exports = { callback, logout, guestLogin };
