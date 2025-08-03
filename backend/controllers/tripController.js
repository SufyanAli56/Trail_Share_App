const Trip = require('../models/Trip');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary');

// @desc    Get all trips
// @route   GET /api/trips
// @access  Public
exports.getTrips = asyncHandler(async (req, res, next) => {
  const trips = await Trip.find().populate('user', 'name email');

  res.status(200).json({
    success: true,
    count: trips.length,
    data: trips,
  });
});

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Public
exports.getTrip = asyncHandler(async (req, res, next) => {
  const trip = await Trip.findById(req.params.id).populate('user', 'name email');

  if (!trip) {
    return next(
      new ErrorResponse(`Trip not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: trip,
  });
});

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
exports.createTrip = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // Handle image upload
  let images = [];
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const result = await cloudinary.uploader.upload(req.files[i].path, {
        folder: 'sufaritrails/trips',
      });
      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }

  req.body.images = images;

  const trip = await Trip.create(req.body);

  res.status(201).json({
    success: true,
    data: trip,
  });
});

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
exports.updateTrip = asyncHandler(async (req, res, next) => {
  let trip = await Trip.findById(req.params.id);

  if (!trip) {
    return next(
      new ErrorResponse(`Trip not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is trip owner
  if (trip.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this trip`,
        401
      )
    );
  }

  trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: trip,
  });
});

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
exports.deleteTrip = asyncHandler(async (req, res, next) => {
  const trip = await Trip.findById(req.params.id);

  if (!trip) {
    return next(
      new ErrorResponse(`Trip not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is trip owner
  if (trip.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this trip`,
        401
      )
    );
  }

  // Delete images from cloudinary
  for (let i = 0; i < trip.images.length; i++) {
    await cloudinary.uploader.destroy(trip.images[i].public_id);
  }

  await trip.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});