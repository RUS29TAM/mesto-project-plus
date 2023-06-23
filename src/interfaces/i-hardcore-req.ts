import { Request } from 'express';

export interface IHardcoreReq extends Request {
  user?: {
    _id: any;
  };
}
