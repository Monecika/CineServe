import jwt from 'jsonwebtoken';
import {User} from '../models/index.js';

export async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({message: 'Not authenticated'});
  }

  let claims;
  try {
    claims = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({message: 'Invalid token'});
  }

  const user = await User.findByPk(claims.id, {attributes: ['id', 'roles', 'status']});
  if (!user || user.status !== 'active') {
    return res.status(403).json({message: 'This account is inactive'});
  }

  req.user = {id: user.id, roles: user.roles};
  next();
}
