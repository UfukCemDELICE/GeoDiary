const mongoose = require('mongoose');
async function connectDatabase(uri) {
  return mongoose.connect(uri);
}
async function disconnectDatabase() {
  return mongoose.disconnect();
}
module.exports = { connectDatabase, disconnectDatabase };
