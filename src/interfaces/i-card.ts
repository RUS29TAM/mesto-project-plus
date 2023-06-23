import { Schema } from 'mongoose';

export interface ICard {
  name: string;
  link: string;
  likes: Schema.Types.ObjectId[];
  owner: Schema.Types.ObjectId;
  createdAt: Schema.Types.Date;
}
