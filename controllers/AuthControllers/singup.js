const jwt = require('jsonwebtoken');
const secretKey = 'Abhishek$';
const User = require('../../models/user');

exports.signup = async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      username,
      password,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
      },
      secretKey,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
