import {User} from '../models/index.js';

export async function adminAuthorization(req, res, next) {
  const user = await User.findByPk(req.user.id, {attributes: ['roles', 'status']});

  if (!user || !user.roles.includes('admin') || user.status !== 'active') {
    return res.status(403).json({message: 'Admin access required'});
  }

  next();
}