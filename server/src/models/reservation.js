import {DataTypes} from 'sequelize';
import {sequelize} from '../config/database.js';

export const Reservation = sequelize.define('Reservation', {
  userId: {
    type: DataTypes.INTEGER, allowNull: false,
  }, movieSlug: {
    type: DataTypes.STRING, allowNull: false,
  }, seats: {
    type: DataTypes.JSON, allowNull: false,
  }, status: {
    type: DataTypes.ENUM('upcoming', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'upcoming',
  }
}, {
  tableName: 'reservations'
});
