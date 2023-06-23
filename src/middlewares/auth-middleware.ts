import { Response, NextFunction } from 'express';
import { IHardcoreReq } from '../interfaces/i-hardcore-req';

export default (req: IHardcoreReq, res: Response, next: NextFunction) => {
  req.user = {
    _id: '648c5061b49a58e19ee012f3',
  };
  next();
};
