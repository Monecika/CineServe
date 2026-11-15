import {Movie, Reservation} from '../models/index.js';
import {Sequelize} from "sequelize";

export const getAllMovies = async () => {
  const movies = await Movie.findAll({
    where: Sequelize.literal("startsAt >= datetime('now')"),
    include: 'hall'
  });

  for (const movie of movies) {
    const reservations = await Reservation.findAll({
      where: {
        movieSlug: movie.slug,
        status: 'upcoming'
      }
    });

    const reservedSeats = reservations.reduce(
      (total, reservation) => total + reservation.seats.length,
      0
    );

    movie.hall.setDataValue(
      'availableSeats',
      movie.hall.totalSeats - reservedSeats
    );
  }

  return movies;
};

export const getMovie = async (slug) => {
  const movie = await Movie.findOne({
    where: { slug },
    include: 'hall'
  });

  if (!movie) {
    throw new Error('Movie not found');
  }

  const reservations = await Reservation.findAll({
    where: {
      movieSlug: movie.slug,
      status: 'upcoming'
    },
    attributes: ['seats']
  });

  const occupiedSeats = reservations.flatMap(
    reservation => reservation.seats
  );

  movie.hall.setDataValue(
    'availableSeats',
    movie.hall.totalSeats - occupiedSeats.length
  );

  movie.setDataValue('occupiedSeats', occupiedSeats);

  return movie;
};

export const createMovie = async (input) => {
  return await Movie.create(input);
};

export const updateMovie = async (slug, input) => {
  const movie = await Movie.findByPk(slug);
  if (!movie) throw {status: 404, message: 'Screening not found'};

  await movie.update(input);
  return movie;
};

export const deleteMovie = async (slug) => {
  const movie = await Movie.findByPk(slug);
  if (!movie) throw {status: 404, message: 'Screening not found'};

  if (await Reservation.findOne({where: {movieSlug: slug}})) {
    throw {status: 409, message: 'Screenings with reservations cannot be deleted'};
  }

  await movie.destroy();
  return {message: 'Screening deleted'};
};
