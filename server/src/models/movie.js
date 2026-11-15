import {DataTypes} from 'sequelize';
import {sequelize} from '../config/database.js';

export const Movie = sequelize.define('Movie', {
  slug: {type: DataTypes.STRING, primaryKey: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.TEXT, allowNull: false},
  duration: {type: DataTypes.INTEGER, allowNull: false},
  genres: {type: DataTypes.JSON, allowNull: false},
  ageRating: {type: DataTypes.STRING, allowNull: false},
  language: {type: DataTypes.STRING, allowNull: false, defaultValue: 'English'},
  poster: {type: DataTypes.STRING, allowNull: false},
  startsAt: {type: DataTypes.DATE, allowNull: false},
  endsAt: {
    type: DataTypes.DATE, get() {
      return new Date(this.startsAt.getTime() + this.duration * 60000);
    }
  },
  hallId: {type: DataTypes.INTEGER, allowNull: false}
}, {
  tableName: 'movies'
});

Movie.prototype.toJSON = function () {
  const {hallId, ...values} = this.get();

  return values;
}
