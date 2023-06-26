import { Response, NextFunction } from 'express';
import { IHardcoreReq } from '../interfaces/i-hardcore-req';

export default (req: IHardcoreReq, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6499865fe67287531a36c4c6',
  };
  next();
};
