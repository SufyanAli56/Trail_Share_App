const express = require('express');
const router = express.Router();
const {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
} = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route('/').get(getTrips).post(protect, upload.array('images'), createTrip);
router
  .route('/:id')
  .get(getTrip)
  .put(protect, updateTrip)
  .delete(protect, deleteTrip);

module.exports = router;