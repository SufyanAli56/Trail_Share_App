const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.ObjectId,
    ref: 'Trip',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate bookmarks
bookmarkSchema.index({ trip: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);