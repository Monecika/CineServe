import {DataTypes} from 'sequelize';
import {sequelize} from '../config/database.js';

export const Hall = sequelize.define('Hall', {
  name: {type: DataTypes.STRING, allowNull: false, unique: true},
  rows: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, max: 26}},
  seatsPerRow: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1}},
  totalSeats: {
    type: DataTypes.INTEGER, get() {
      return this.rows * this.seatsPerRow;
    }
  }
}, {
  tableName: 'halls'
});

