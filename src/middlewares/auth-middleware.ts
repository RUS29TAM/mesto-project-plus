import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAuthorization, IPayload } from '../interfaces/i-authorization';
import NotAuthError from '../errors/not-auth-error';
import { JWT_SECRET_KEY } from '../utils/constants';

export default (req: IAuthorization, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new NotAuthError('Требуется авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  if (!token) {
    return next(new NotAuthError('Токен не найден'));
  }

  let payload: IPayload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY) as IPayload;
  } catch (err) {
    return next(new NotAuthError('Не соответствующий токен'));
  }

  req.user = payload;
  return next();
};
