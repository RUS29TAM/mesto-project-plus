import { Response, NextFunction } from 'express';
import { IHardcoreReq } from '../interfaces/i-hardcore-req';
import { TError } from '../types/t-error';
import { INTERNAL_SERVER_ERROR } from '../utils/constants';

const unexpectedErrMiddleware = (
  err: TError,
  req: IHardcoreReq,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  const errorMessage = statusCode === INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : message;
  res.status(statusCode).send({ message: errorMessage });
  next(err);
};

export default unexpectedErrMiddleware;
