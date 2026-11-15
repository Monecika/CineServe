import express from "express";
import {authMiddleware} from "../middleware/authentication.js";
import {userAuthorization} from "../middleware/user-authorization.js";
import {sanitizeTextFields} from "../middleware/sanitize-input.js";
import * as reservationController from "../controllers/reservation-controller.js";

const router = express.Router();

router.get('/me', authMiddleware, userAuthorization, reservationController.getUserReservations);
router.patch('/:id/cancel', authMiddleware, userAuthorization, reservationController.cancelReservation);
router.post(
  '/',
  authMiddleware,
  userAuthorization,
  ...sanitizeTextFields('movieSlug', 'seats.*'),
  reservationController.createReservation
);

export default router;
