import { Response, NextFunction } from "express";
import { IHardcoreRequest } from "../interfaces/i-hardcore-request";
import { TError } from "../types/t-error";

// eslint-disable-next-line max-len
const unexpectedErrMiddleware = (err: TError, req: IHardcoreRequest, res: Response, next: NextFunction) => {
  const { respStatusCode = 500, message } = err;
  const errorMessage = respStatusCode === 500 ? "На сервере произошла ошибка" : message;
  res.status(respStatusCode).send({ message: errorMessage });
  next(err);
};

export default unexpectedErrMiddleware;
