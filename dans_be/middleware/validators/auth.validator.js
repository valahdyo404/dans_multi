const { body, validationResult } = require('express-validator');
const  ErrorResponse  = require('../../utils/errorResponse');

const loginScheme = () => {
  return [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3, max: 50 })
      .withMessage('Username must be between 3 and 50 characters'),
    
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array()
  .map(err => `${err.msg}`)
  .join(', and ');

  return next(new ErrorResponse(extractedErrors, 400));
};

module.exports = {
  loginScheme,
  validate
};