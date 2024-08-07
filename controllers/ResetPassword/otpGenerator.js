const Otp = require('../../models/otp');
const User = require('../../models/user');
const nodemailer = require('nodemailer');

const crypto = require('crypto');

exports.otpGenerator = async (req, res) => {
  
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User don't exist" });
    }

    const userId = user._id;
    const otp = generateRandomNumber(4);
    
    //Send Email for otp
    const transporter = nodemailer.createTransport({
      host: 'smtppro.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: 'support@tayaltravels.com',
        pass: 'Iwii&u3j',
      },
    });

    const mailOptions = {
      from: 'Support support@tayaltravels.com',
      to: user.email,
      subject: 'Reset Password',
      text: `Dear ${user.username},
      \n\nYour one time password is ${otp}
      \nAbhishek Tayal`,
    };

    await transporter.sendMail(mailOptions);

    //Save otp in db
    const newOtp = new Otp({ otp, userId });
    await newOtp.save();

    res.status(201).json({ message: 'opt sent to registered email' });
  } catch (error) {
    console.error('error generating opt:', error);
    res.status(500).json({ message: 'Failed to generate otp' });
  }
}

// Function to generate a random otp
function generateRandomNumber(length) {
  const buffer = crypto.randomBytes(Math.ceil(length / 2));
  return buffer.toString('hex').slice(0, length);
}
