import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces/i-user';
import { defaultUser, emailRegExp, urlRegExp } from '../utils/constants';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: defaultUser.name,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: defaultUser.about,
  },
  avatar: {
    type: String,
    default: defaultUser.avatar,
    validate: {
      validator: (v: any) => urlRegExp.test(v),
      // message: (props) => `${props.value} не валидный url, проверьте ссылку на аватар!`,
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v: any) => emailRegExp.test(v),
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default model<IUser>('user', userSchema);
