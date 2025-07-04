// backend/routes/user.js
// This new file handles all routes related to user data.

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   GET /api/user/me
// @desc    Get current user's profile information
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // We already have req.user from our authMiddleware.
    // We use .select('-otp -otpExpires') to exclude the otp fields from being sent.
    const user = await User.findById(req.user.id).select('-otp -otpExpires');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // We can send back whatever profile information we want.
    // Let's include the email and the number of saved recipes.
    res.json({
      email: user.email,
      name: user.name,
      bio: user.bio,
      profilePictureUrl: user.profilePictureUrl,
      cookbookCount: user.cookbook.length,
      memberSince: user.createdAt,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/user/me
// @desc    Update current user's profile
// @access  Private
router.put('/me', authMiddleware, async (req, res) => {
  const { name, bio, profilePictureUrl } = req.body;

  // Build profile object based on fields that were submitted
  const profileFields = {};
  if (name !== undefined) profileFields.name = name;
  if (bio !== undefined) profileFields.bio = bio;
  if (profilePictureUrl !== undefined) profileFields.profilePictureUrl = profilePictureUrl;

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Find the user by their ID and update their profile
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true, runValidators: true } // Return the document after it has been updated
    ).select('-otp -otpExpires');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
