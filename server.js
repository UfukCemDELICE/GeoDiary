const { readEnvironment } = require('./config/environment');
const { connectDatabase, disconnectDatabase } = require('./config/database');
const { createApp } = require('./app');
async function start() {
  const config = readEnvironment();
  await connectDatabase(config.mongoUri);
  const server = createApp(config).listen(config.port, () =>
    console.log(`GeoDiary listening on port ${config.port}`),
  );
  let closing = false;
  async function shutdown(signal) {
    if (closing) return;
    closing = true;
    console.log(`${signal}: shutting down`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000).unref();
  }
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
start().catch((error) => {
  console.error(`Startup failed: ${error.message}`);
  process.exitCode = 1;
});
