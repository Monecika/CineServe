import * as reservationService from "../services/reservation-service.js";

export const getUserReservations = async (req, res) => {
  const data = await reservationService.getUserReservations(req.user.id);

  res.json(data);
};

export const cancelReservation = async (req, res) => {
  const reservation = await reservationService.cancelReservation(
    req.params.id,
    req.user.id
  );

  res.status(200).json(reservation);
};

export const createReservation = async (req, res) => {
  if (!Array.isArray(req.body.seats) || req.body.seats.length < 1 || req.body.seats.length > 5) {
    throw {status: 400, message: 'Choose between 1 and 5 seats'};
  }

  const reservation = await reservationService.createReservation(
    req.user.id,
    req.body.movieSlug,
    req.body.seats
  );

  res.status(201).json(reservation);
};
