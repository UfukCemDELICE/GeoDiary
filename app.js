const path = require('node:path');
const express = require('express');
const helmet = require('helmet');
const methodOverride = require('method-override');
const passport = require('passport');
const { readEnvironment } = require('./config/environment');
const { createSessionMiddleware } = require('./config/session');
const { configurePassport } = require('./config/passport');
const { createUpload } = require('./middleware/upload');
const csrf = require('./middleware/csrf');
const exposeUser = require('./middleware/expose-user');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
function createApp(config = readEnvironment({ requireExternal: true })) {
  const app = express();
  app.locals.config = config;
  app.locals.upload = createUpload(config);
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'views'));
  if (config.nodeEnv === 'production') app.set('trust proxy', 1);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            'https://api.mapbox.com',
            'https://cdn.tailwindcss.com',
          ],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            'https://api.mapbox.com',
            'https://fonts.googleapis.com',
          ],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: [
            "'self'",
            'data:',
            'blob:',
            'https://*.mapbox.com',
            'https://lh3.googleusercontent.com',
          ],
          connectSrc: ["'self'", 'https://api.mapbox.com', 'https://events.mapbox.com'],
          workerSrc: ["'self'", 'blob:'],
          childSrc: ['blob:'],
        },
      },
    }),
  );
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(methodOverride('_method'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(createSessionMiddleware(config));
  configurePassport(passport, config);
  app.use(passport.initialize());
  app.use(passport.session());
  if (config.nodeEnv === 'test')
    app.use((req, _res, next) => {
      const id = req.get('x-test-user-id');
      if (id) {
        req.user = { _id: id };
        req.isAuthenticated = () => true;
      }
      next();
    });
  app.use(exposeUser);
  app.use(csrf);
  app.use('/', require('./routes/home.routes'));
  app.use('/auth', require('./routes/auth.routes'));
  app.use('/diaries', require('./routes/diary.routes'));
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
module.exports = { createApp };
