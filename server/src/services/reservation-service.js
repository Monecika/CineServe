import {Movie, Reservation} from '../models/index.js';

const DAY = 24 * 60 * 60 * 1000;

export const getUserReservations = async (userId) => {
  const reservations = await Reservation.findAll({
    where: {userId},
    attributes: ['id', 'status', 'seats', 'createdAt'],
    include: {model: Movie, as: 'movie', include: 'hall'}
  });

  return reservations.map((reservation) => {
    const {id, seats, createdAt, movie} = reservation;
    const {hall, ...movieData} = movie.toJSON();

    const status = reservation.status === 'upcoming' && movie.endsAt < new Date() ? 'completed' : reservation.status;

    return {id, status, seats, createdAt, movie: movieData, hall: hall.name};
  });
};

export const cancelReservation = async (id, userId) => {
  const reservation = await Reservation.findOne({
    where: {id, userId}, include: {model: Movie, as: 'movie'}
  });

  if (!reservation) {
    throw {status: 404, message: 'Reservation not found'};
  }

  if (reservation.status !== 'upcoming') {
    throw {status: 400, message: 'Only upcoming reservations can be cancelled'};
  }

  if (reservation.movie.startsAt - Date.now() <= DAY) {
    throw {status: 400, message: 'Cannot cancel less than 24h before showtime'};
  }

  await reservation.update({status: 'cancelled'});

  return reservation;
};

export const createReservation = async (userId, movieSlug, seats) => {
  const reservations = await Reservation.findAll({
    where: {
      movieSlug,
      status: 'upcoming'
    }
  })

  const reservedSeats = reservations.flatMap(reservation => reservation.seats)

  if (seats.some(seat => reservedSeats.includes(seat))) {
    throw new Error('One or more seats are already reserved')
  }

  return Reservation.create({
    userId,
    movieSlug,
    seats
  })
}
