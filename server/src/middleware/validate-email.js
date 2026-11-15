const parseEmail = (email) => {
  const pattern = /^[a-zA-Z0-9.]+@[a-z]+\.[a-z]+$/

  if (typeof email !== 'string' || !pattern.test(email)) {
    throw {status: 400, message: 'email is not valid'};
  }

  return email;
};

export function validateEmail(req, res, next) {
  req.body.email = parseEmail(req.body.email);
  next();
}