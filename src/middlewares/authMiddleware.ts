import { jwtService } from '../modules/jwt/jwt.service';
import { Controller } from '../typedefs';

export const authMiddleware: Controller = (req, res, next) => {
  const authorization = req.headers['authorization'] || '';

  const [, token] = authorization.split(' ');

  if (!authorization || !token) {
    res.sendStatus(401);

    return;
  }

  const userData = jwtService.verify(token);

  if (!userData) {
    res.sendStatus(401);

    return;
  }

  next();
};
