import { model, Schema } from 'mongoose';
import { ICard } from '../interfaces/i-card';
import { urlRegExp } from '../utils/constants';

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v: any) => urlRegExp.test(v),
      // message: (props) => `${props.value} не валидный url, проверьте ссылку на изображение!`,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<ICard>('card', cardSchema);
