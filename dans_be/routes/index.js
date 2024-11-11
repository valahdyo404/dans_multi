const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const AuthController = require('../controllers/auth.controller');
const JobsController = require('../controllers/jobs.controller');
const { loginScheme, validate } = require('../middleware/validators/auth.validator');

router.post('/auth/login',   loginScheme(), validate, AuthController.login);
router.get('/jobs', authMiddleware, JobsController.getJobs);
router.get('/jobs/:id', authMiddleware, JobsController.getJobDetail);

module.exports = router;