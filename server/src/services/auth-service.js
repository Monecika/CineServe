import {User} from '../models/index.js';
import jwt from "jsonwebtoken";

export const login = async (email, password) => {
  const user = await User.findOne({where: {email}});

  if (!user) {
    throw {status: 404, message: 'User not registered'};
  }

  if (!(await user.checkPassword(password))) {
    throw {status: 401, message: 'Invalid password'};
  }

  if (user.status !== 'active') {
    throw {status: 403, message: 'This account has been deactivated'};
  }

  const token = jwt.sign(
    {
      id: user.id,
      roles: user.roles
    },
    process.env.JWT_SECRET,
    {expiresIn: '1h'}
  );

  return {
    token,
    user: user.toJSON()
  };
};

export const register = async ({firstName, lastName, email, password}) => {
  const existing = await User.findOne({where: {email}});

  if (existing) {
    throw {status: 409, message: 'An account with this email already exists'};
  }

  const user = await User.create({firstName, lastName, email, password});

  return {user};
};
