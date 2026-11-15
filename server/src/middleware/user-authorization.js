export function userAuthorization(req, res, next) {
  if (!req.user?.roles?.includes('user')) {
    return res.status(403).json({message: 'User access required'});
  }

  next();
}
