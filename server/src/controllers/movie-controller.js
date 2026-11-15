import * as movieService from "../services/movie-service.js";

export const getAllMovies = async (req, res) => {
  const data = await movieService.getAllMovies();

  res.json(data);
};

export const createMovie = async (req, res) => {
  const data = await movieService.createMovie(req.body);
  res.status(201).json(data);
};

export const updateMovie = async (req, res) => {
  const data = await movieService.updateMovie(req.params.slug, req.body);

  res.json(data);
};

export const deleteMovie = async (req, res) => {
  const data = await movieService.deleteMovie(req.params.slug);
  res.json(data);
};

export const getMovie = async (req, res) => {
  const data = await movieService.getMovie(req.params.slug);

  res.json(data);
};
