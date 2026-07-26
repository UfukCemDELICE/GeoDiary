const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true, index: true },
    displayName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    avatarUrl: String,
  },
  { timestamps: true },
);
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
