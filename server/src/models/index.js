
import { sequelize } from '../config/database.js';
import { Movie } from './movie.js';
import { Hall } from './hall.js';
import { User } from './user.js';
import { Reservation } from './reservation.js';

// Hall <-> Movie
Hall.hasMany(Movie, {
  foreignKey: 'hallId',
  as: 'movies',
});

Movie.belongsTo(Hall, {
  foreignKey: 'hallId',
  as: 'hall',
});

// User <-> Reservation
User.hasMany(Reservation, {
  foreignKey: 'userId',
  as: 'reservations',
});

Reservation.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// Movie <-> Reservation
Movie.hasMany(Reservation, {
  foreignKey: 'movieSlug',
  sourceKey: 'slug',
  as: 'reservations',
});

Reservation.belongsTo(Movie, {
  foreignKey: 'movieSlug',
  targetKey: 'slug',
  as: 'movie',
});

// Database initialization
export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    await sequelize.sync();
    console.log('Database synchronized.');

  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

export {
  sequelize,
  Hall,
  Movie,
  User,
  Reservation,
};
