import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/i-user";
import { defaultUser, urlRegExp } from "../utils/constants";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: defaultUser.name,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
    default: defaultUser.about,
  },
  avatar: {
    type: String,
    required: true,
    default: defaultUser.avatar,
    validate: {
      validator: (v: any) => {
        return urlRegExp.test(v);
      },
      // message: (props) => `${props.value} не валидный url, проверьте ссылку на аватар!`,
    }
  },
});

export default model<IUser>("user", userSchema);
