const bcrypt = require('bcryptjs');
const jwtUtil = require('../utils/jwtUtil');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

  const token = jwtUtil.generateToken(user);
  res.json({ token });
};

exports.logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

