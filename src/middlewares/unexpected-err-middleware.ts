import { Response, NextFunction } from "express";
import { IHardcoreRequest } from "../interfaces/i-hardcore-request";
import { TError } from "../types/t-error";
import { INTERNAL_SERVER_ERROR } from "../utils/constants";

// eslint-disable-next-line max-len
const unexpectedErrMiddleware = (err: TError, req: IHardcoreRequest, res: Response, next: NextFunction) => {
  const { respStatusCode = INTERNAL_SERVER_ERROR, message } = err;
  const errorMessage = respStatusCode === INTERNAL_SERVER_ERROR ? "На сервере произошла ошибка" : message;
  res.status(respStatusCode).send({ message: errorMessage });
  next(err);
};

export default unexpectedErrMiddleware;
