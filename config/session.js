const session = require('express-session');
const MongoStore = require('connect-mongo');
function createSessionMiddleware(config) {
  const options = {
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: config.nodeEnv === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  };
  if (config.nodeEnv !== 'test') {
    options.store = MongoStore.create({ mongoUrl: config.mongoUri });
  }
  return session(options);
}
module.exports = { createSessionMiddleware };
