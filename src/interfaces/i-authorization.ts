import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IAuthorization extends Request {
user?: string | JwtPayload;
}

export interface IPayload {
  _id: JwtPayload;
}
