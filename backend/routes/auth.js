import express from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

const validateAuth = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

router.post('/register', [
  ...validateAuth,
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
], register);

router.post('/login', validateAuth, login);

export default router;
