const Comment = require('../models/Comment');
const Trip = require('../models/Trip');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');

// @desc    Get comments for a trip
// @route   GET /api/trips/:tripId/comments
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ trip: req.params.tripId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: comments.length,
    data: comments,
  });
});

// @desc    Add comment
// @route   POST /api/trips/:tripId/comments
// @access  Private
exports.addComment = asyncHandler(async (req, res, next) => {
  req.body.trip = req.params.tripId;
  req.body.user = req.user.id;

  const trip = await Trip.findById(req.params.tripId);

  if (!trip) {
    return next(
      new ErrorResponse(`No trip with the id of ${req.params.tripId}`, 404)
    );
  }

  const comment = await Comment.create(req.body);

  res.status(201).json({
    success: true,
    data: comment,
  });
});

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
exports.updateComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure comment belongs to user or user is admin
  if (comment.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this comment`,
        401
      )
    );
  }

  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure comment belongs to user or user is admin
  if (comment.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this comment`,
        401
      )
    );
  }

  await comment.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});