const dotenv = require('dotenv');
dotenv.config();

function readEnvironment({ requireExternal = true } = {}) {
  const values = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT || 3000),
    mongoUri: process.env.MONGODB_URI,
    sessionSecret: process.env.SESSION_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleCallbackUrl:
      process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
    mapboxToken: process.env.MAPBOX_ACCESS_TOKEN || '',
    maxUploadBytes: Number(process.env.MAX_UPLOAD_SIZE_MB || 5) * 1024 * 1024,
    uploadDirectory: process.env.UPLOAD_DIRECTORY || 'public/uploads',
  };
  if (requireExternal) {
    const required = [
      ['MONGODB_URI', values.mongoUri],
      ['SESSION_SECRET', values.sessionSecret],
      ['GOOGLE_CLIENT_ID', values.googleClientId],
      ['GOOGLE_CLIENT_SECRET', values.googleClientSecret],
    ];
    const missing = required.filter(([, value]) => !value).map(([name]) => name);
    if (missing.length)
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  if (!Number.isInteger(values.port) || values.port < 1 || values.port > 65535)
    throw new Error('PORT must be an integer between 1 and 65535');
  return Object.freeze(values);
}
module.exports = { readEnvironment };
