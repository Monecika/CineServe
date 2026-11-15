import * as authService from '../services/auth-service.js';

export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password?.trim();

  if (!password) {
    throw {status: 400, message: 'Password is required'};
  }

  const data = await authService.login(email, password);
  res.json(data);
};

export const register = async (req, res) => {
  const {firstName, lastName, email, password} = req.body;
  const trimmedFirstName = firstName?.trim();
  const trimmedLastName = lastName?.trim();
  const trimmedPassword = password?.trim();

  if (!trimmedFirstName || !trimmedLastName) {
    throw {status: 400, message: 'First name and last name are required'};
  }
  if (!trimmedPassword) {
    throw {status: 400, message: 'Password is required'};
  }

  const user = await authService.register({
    firstName: trimmedFirstName,
    lastName: trimmedLastName,
    email,
    password: trimmedPassword,
  });

  res.status(201).json(user);
}
