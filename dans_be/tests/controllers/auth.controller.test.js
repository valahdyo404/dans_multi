const AuthController = require('../../controllers/auth.controller.js');
const AuthService = require('../../services/auth.service.js');
const ErrorResponse = require('../../utils/errorResponse.js');

jest.mock('../../services/auth.service.js');

describe('AuthController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        username: 'testUser',
        password: 'testPassword',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('login', () => {
    it('should return success response for valid credentials', async () => {
      const mockResult = { token: 'fakeToken' };
      AuthService.login.mockResolvedValue(mockResult); // Mocking successful login

      await AuthController.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        code: "1",
        msg: "Login Success",
        data: mockResult,
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next with an error response for invalid credentials', async () => {
      const mockError = new Error('Invalid credentials');
      AuthService.login.mockRejectedValue(mockError);

      await AuthController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(new ErrorResponse(mockError.message, 500));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});