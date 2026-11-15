import express from 'express';
import {authMiddleware} from '../middleware/authentication.js';
import {adminAuthorization} from '../middleware/admin-authorization.js';
import * as hallController from '../controllers/hall-controller.js';

const router = express.Router();

router.get('/', authMiddleware, adminAuthorization, hallController.getHalls);

export default router;