import {DataTypes} from 'sequelize';
import {sequelize} from '../config/database.js';
import bcrypt from 'bcryptjs';

export const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING, allowNull: false,
  }, lastName: {
    type: DataTypes.STRING, allowNull: false,
  }, email: {
    type: DataTypes.STRING, allowNull: false, unique: true, validate: {isEmail: true},
  }, roles: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: ['user'],
  }, status: {
    type: DataTypes.ENUM('active', 'inactive'), allowNull: false, defaultValue: 'active',
  }, password: {
    type: DataTypes.STRING, allowNull: false,
  }
}, {
  tableName: 'users'
});

User.beforeSave(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
})

User.prototype.toJSON = function () {
  const {password, ...values} = this.get();
  return values;
}

User.prototype.checkPassword = function (hashedPassword) {
  return bcrypt.compare(hashedPassword, this.password);
};
