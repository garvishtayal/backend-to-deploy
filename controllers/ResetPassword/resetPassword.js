const Otp = require('../../models/otp');
const User = require('../../models/user');

exports.resetPassword = async (req, res) => {
  try {
    const { username, otp, newPassword } = req.body;

    const user = await User.findOne({ username });

    if (user==null) {
      return res.status(401).json({ message: 'Incorrect Username' });
    }

    const userId = user._id;
    const otpEntry = await Otp.findOne({ userId, otp });

    // Check if user and OTP exist
    if (otpEntry==null) {
      return res.status(401).json({ message: 'Incorrect OTP' });
    }

    user.password = newPassword;
    await user.save();

    // Delete the used OTP document
    await Otp.deleteMany({ userId });

    res.status(200).json({ message: 'Password updated' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Failed to update password' });
  }
}
