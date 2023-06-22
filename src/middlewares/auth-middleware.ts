import { Response, NextFunction } from "express";
import { IHardcoreRequest } from "../interfaces/i-hardcore-request";

export default (req: IHardcoreRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: "648c5061b49a58e19ee012f3"
  };
  next();
};
