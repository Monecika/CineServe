import express from 'express';
import * as authController from '../controllers/auth-controller.js';
import {validateEmail} from '../middleware/validate-email.js';
import {sanitizeTextFields} from '../middleware/sanitize-input.js';

const router = express.Router();

router.post('/login', ...sanitizeTextFields('email'), validateEmail, authController.login);
router.post(
  '/register',
  ...sanitizeTextFields('firstName', 'lastName', 'email'),
  validateEmail,
  authController.register
);

export default router;
