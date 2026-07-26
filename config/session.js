const session = require('express-session');
const MongoStore = require('connect-mongo');
function createSessionMiddleware(config) {
  return session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.mongoUri }),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: config.nodeEnv === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  });
}
module.exports = { createSessionMiddleware };
