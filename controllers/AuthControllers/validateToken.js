const jwt = require('jsonwebtoken');
const secretKey = 'Abhishek$';
const User = require('../../models/user');

exports.validateToken = async (req, res) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    //token verification by checking user existance in db
    const decoded = jwt.verify(token, secretKey);

    const user = await User.findOne({ 'username': decoded.username });
    if (!user) {
      return res.status(401).json({ message: "User don't exist" });
    }


    res.status(200).json({ message: 'Authorized' });

  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({ message: 'token is Invalid' });
  }
};