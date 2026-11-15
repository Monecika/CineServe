import * as userService from '../services/user-service.js';

export const getCurrentUser = async (req, res) => {
  const data = await userService.getUser(req.user.id);

  res.json(data);
};

export const getAllUsers = async (req, res) => {
  const data = await userService.getAllUsers(req.user.id);
  return res.json(data);
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  res.json(await userService.updateUser(userId, req.body));
};

export const updateCurrentUser = async (req, res) => {
  const {firstName, lastName, email, currentPassword, newPassword} = req.body;

  if (newPassword && (!currentPassword || newPassword.length < 8)) {
    throw {
      status: 400,
      message: 'A current password and a new password of at least 8 characters are required',
    };
  }

  const data = await userService.updateUser(req.user.id, {
    firstName,
    lastName,
    email,
    currentPassword,
    newPassword,
  });
  res.json(data);
};
