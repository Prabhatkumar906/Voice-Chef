// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/email'); // <-- 1. IMPORT our email utility

router.post('/request-otp', async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = Date.now() + 10 * 60 * 1000;

        const user = await User.findOneAndUpdate(
            { email },
            { otp, otpExpires: expires },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // --- NEW EMAIL SENDING LOGIC ---
        // 2. Prepare the email content
        const subject = 'Your OTP for VoiceChef Login';
        const html = `<p>Your One-Time Password (OTP) for VoiceChef is: <strong>${otp}</strong></p><p>It is valid for 10 minutes.</p>`;


        // ADD THIS DEBUGGING LINE:
        console.log('Preparing to send email to the following user object:', user);

        // 4. Send a success response to the client
        await sendEmail({
            to: user.email,
            subject,
            html
        });

        // NOTICE: We NO LONGER send the OTP in the response for security reasons.
        res.status(200).json({ message: "OTP has been sent to your email." });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

    router.post('/verify-otp', async (req, res) => {
        try {
          const { email, otp } = req.body;
      
          // 1. Find the user by email
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(400).json({ msg: 'User not found.' });
          }
      
          // 2. Check if the OTP is correct and not expired
          if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ msg: 'Invalid or expired OTP.' });
          }
      
          // 3. Clear the OTP from the database after successful verification
          //    This is a security measure so the OTP cannot be reused.
          user.otp = undefined;
          user.otpExpires = undefined;
          await user.save();
      
          // 4. Create a JWT payload
          const payload = {
            user: {
              id: user.id, // We use the MongoDB document ID
            },
          };
      
          // 5. Sign the token
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' }, // Token expires in 5 hours
            (err, token) => {
              if (err) throw err;
              res.json({ token }); // Send the token back to the client
            }
          );
        } catch (error) {
          console.error(error.message);
          res.status(500).send('Server Error');
        }
      
})});

module.exports = router;