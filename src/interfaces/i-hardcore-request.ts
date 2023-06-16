import { Request } from "express";

export interface IHardcoreRequest extends Request {
  user?: {
    _id: string;
  };
}
