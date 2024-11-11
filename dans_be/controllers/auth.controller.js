const AuthService = require('../services/auth.service.js');
const ErrorResponse = require('../utils/errorResponse');

class AuthController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const result = await AuthService.login(username, password);
      res.status(200).json({
        code: "1",
        msg: "Login Success",
        data: result
      });
    } catch (error) {
      next(new ErrorResponse(error.message, 500));
    }
  }
}

module.exports = AuthController;