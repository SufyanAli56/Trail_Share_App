const express = require('express');
const router = express.Router();
const {
  getBookmarks,
  addBookmark,
  removeBookmark,
} = require('../controllers/bookmarkController');
const { protect } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protect, getBookmarks);
router
  .route('/:id')
  .delete(protect, removeBookmark);
router
  .route('/trips/:tripId')
  .post(protect, addBookmark);

module.exports = router;