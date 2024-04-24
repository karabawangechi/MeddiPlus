const User = require('../models/user');
const path = require('path');
const fs = require('fs');

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user location
    if (req.body.latitude && req.body.longitude) {
      user.location.coordinates = [req.body.latitude, req.body.longitude];
    }

    // Upload profile photo
    if (req.file) {
      const photoPath = path.join('uploads', req.file.filename);
      user.profilePhoto = photoPath;
    }

    await user.save();
    res.json({ message: 'User profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};