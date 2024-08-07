const jwt = require('jsonwebtoken');
const secretKey = 'Abhishek$';
const User = require('../../models/user');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "User don't exist" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: 'Wrong Password' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      secretKey,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};