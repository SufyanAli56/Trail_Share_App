const Bookmark = require('../models/Bookmark');
const Trip = require('../models/Trip');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');

// @desc    Get user bookmarks
// @route   GET /api/bookmarks
// @access  Private
exports.getBookmarks = asyncHandler(async (req, res, next) => {
  const bookmarks = await Bookmark.find({ user: req.user.id }).populate({
    path: 'trip',
    populate: {
      path: 'user',
      select: 'name',
    },
  });

  res.status(200).json({
    success: true,
    count: bookmarks.length,
    data: bookmarks,
  });
});

// @desc    Add bookmark
// @route   POST /api/trips/:tripId/bookmarks
// @access  Private
exports.addBookmark = asyncHandler(async (req, res, next) => {
  const trip = await Trip.findById(req.params.tripId);

  if (!trip) {
    return next(
      new ErrorResponse(`No trip with the id of ${req.params.tripId}`, 404)
    );
  }

  // Check if already bookmarked
  const existingBookmark = await Bookmark.findOne({
    trip: req.params.tripId,
    user: req.user.id,
  });

  if (existingBookmark) {
    return next(
      new ErrorResponse('This trip is already in your bookmarks', 400)
    );
  }

  const bookmark = await Bookmark.create({
    trip: req.params.tripId,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: bookmark,
  });
});

// @desc    Remove bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Private
exports.removeBookmark = asyncHandler(async (req, res, next) => {
  const bookmark = await Bookmark.findById(req.params.id);

  if (!bookmark) {
    return next(
      new ErrorResponse(`No bookmark with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure bookmark belongs to user
  if (bookmark.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this bookmark`,
        401
      )
    );
  }

  await bookmark.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});