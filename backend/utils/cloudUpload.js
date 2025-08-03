const cloudinary = require('../config/cloudinary');
const ErrorResponse = require('../utils/errorResponse');

exports.uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'sufaritrails',
    });
    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    throw new ErrorResponse('Image upload failed', 500);
  }
};

exports.deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new ErrorResponse('Image deletion failed', 500);
  }
};