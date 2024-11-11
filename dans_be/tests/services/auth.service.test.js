const AuthService = require('../../services/auth.service'); // Adjust the path as necessary
const { User } = require('../../models');
const jwt = require('jsonwebtoken');

jest.mock('../../models'); // Mock the User model
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  describe('login', () => {
    const username = 'testUser';
    const password = 'testPassword';
    const user = {
      id: 1,
      username: 'testUser',
      validatePassword: jest.fn(),
    };

    beforeEach(() => {
      jest.clearAllMocks(); // Clear mocks before each test
    });

    it('should return a token for valid credentials', async () => {
      user.validatePassword.mockResolvedValue(true);
      User.findOne.mockResolvedValue(user);
      jwt.sign.mockReturnValue('mockToken');

      const result = await AuthService.login(username, password);

      expect(User.findOne).toHaveBeenCalledWith({ where: { username } });
      expect(user.validatePassword).toHaveBeenCalledWith(password);
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      expect(result).toEqual({ token: 'mockToken' });
    });

    it('should throw an error for invalid password', async () => {
      user.validatePassword.mockResolvedValue(false);
      User.findOne.mockResolvedValue(user);

      await expect(AuthService.login(username, password)).rejects.toThrow('Invalid credentials');
      expect(user.validatePassword).toHaveBeenCalledWith(password);
    });
  });
});