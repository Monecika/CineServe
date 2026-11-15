import express from 'express';
import {authMiddleware} from '../middleware/authentication.js';
import {adminAuthorization} from '../middleware/admin-authorization.js';
import {sanitizeTextFields} from '../middleware/sanitize-input.js';
import * as movieController from "../controllers/movie-controller.js";

const router = express.Router();

router.get('/', movieController.getAllMovies);
const sanitizeMovieFields = sanitizeTextFields(
  'title',
  'description',
  'genres.*',
  'ageRating',
  'language',
  'poster'
);

router.post('/', authMiddleware, adminAuthorization, ...sanitizeMovieFields, movieController.createMovie);
router.put('/:slug', authMiddleware, adminAuthorization, ...sanitizeMovieFields, movieController.updateMovie);
router.delete('/:slug', authMiddleware, adminAuthorization, movieController.deleteMovie);
router.get('/:slug', movieController.getMovie);

export default router;
