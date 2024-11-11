const jwt = require('jsonwebtoken');
const { User } = require('../models');

class AuthService {
  static async login(username, password) {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await user.validatePassword(password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token };
  }
}

module.exports = AuthService;