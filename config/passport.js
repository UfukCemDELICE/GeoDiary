const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/User');
function configurePassport(passport, config) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: config.googleCallbackUrl,
      },
      async (_access, _refresh, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const user = await User.findOneAndUpdate(
            { googleId: profile.id },
            {
              $set: {
                displayName: profile.displayName,
                email,
                avatarUrl: profile.photos?.[0]?.value,
              },
            },
            { upsert: true, new: true, setDefaultsOnInsert: true },
          );
          done(null, user);
        } catch (error) {
          done(error);
        }
      },
    ),
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      done(null, await User.findById(id));
    } catch (error) {
      done(error);
    }
  });
}
module.exports = { configurePassport };
