import express from 'express';
import {authMiddleware} from "../middleware/authentication.js";
import {adminAuthorization} from "../middleware/admin-authorization.js";
import {userAuthorization} from "../middleware/user-authorization.js";
import {validateEmail} from "../middleware/validate-email.js";
import {sanitizeTextFields} from "../middleware/sanitize-input.js";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();

router.get('/me', authMiddleware, userController.getCurrentUser);
router.put(
  '/me',
  authMiddleware,
  userAuthorization,
  ...sanitizeTextFields('firstName', 'lastName', 'email'),
  validateEmail,
  userController.updateCurrentUser
);
router.get('/', authMiddleware, adminAuthorization, userController.getAllUsers);
router.put('/:id', authMiddleware, adminAuthorization, userController.updateUser);

export default router;
