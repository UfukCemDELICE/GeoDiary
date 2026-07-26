const mongoose = require('mongoose');
const pointSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Point'], required: true, default: 'Point' },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (v) =>
          v.length === 2 && v[0] >= -180 && v[0] <= 180 && v[1] >= -90 && v[1] <= 90,
        message: 'Coordinates must be [longitude, latitude] in valid ranges',
      },
    },
  },
  { _id: false },
);
const photoSchema = new mongoose.Schema(
  { url: String, storageKey: String, originalName: String, mimeType: String, size: Number },
  { _id: false },
);
const diarySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    content: { type: String, required: true, trim: true, maxlength: 5000 },
    diaryDate: { type: Date, required: true },
    location: { type: pointSchema, required: true },
    locationName: { type: String, trim: true, maxlength: 200 },
    photo: photoSchema,
  },
  { timestamps: true },
);
diarySchema.index({ location: '2dsphere' });
diarySchema.index({ user: 1, diaryDate: -1 });
module.exports = mongoose.models.Diary || mongoose.model('Diary', diarySchema);
