import { Response, NextFunction } from "express";
import { IHardcoreRequest } from "../interfaces/i-hardcore-request";

export default (req: IHardcoreRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133"
  };
  next();
};
