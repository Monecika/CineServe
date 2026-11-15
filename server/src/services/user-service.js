import {Op} from 'sequelize';
import {User} from '../models/index.js';

export const getUser = async (id) => {
  const user = await User.findOne({
    where: {id},
  });

  return user;
};

export const updateUser = async (id, updates) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw {status: 404, message: 'User not found'};
  }

  const {currentPassword, newPassword, ...userUpdates} = updates;

  if (userUpdates.roles !== undefined) {
    const validRoles = ['user', 'admin'];

    if (
      !Array.isArray(userUpdates.roles) ||
      !userUpdates.roles.length ||
      !userUpdates.roles.every(role => validRoles.includes(role))
    ) {
      throw { status: 400, message: 'Select valid roles' };
    }
  }

  if (currentPassword && !(await user.checkPassword(currentPassword))) {
    throw {status: 401, message: 'Current password is incorrect'};
  }

  if (userUpdates.email && userUpdates.email !== user.email) {
    const existingUser = await User.findOne({where: {email: userUpdates.email}});
    if (existingUser) {
      throw {status: 409, message: 'An account with this email already exists'};
    }
  }

  if (newPassword) userUpdates.password = newPassword;

  await user.update(userUpdates);
  return user;
};

export const getAllUsers = async (userId) => {
  return await User.findAll({
    where: {id: {[Op.ne]: userId}},
  });
};

