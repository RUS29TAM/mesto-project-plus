import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/i-user";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
    validator: (v: any) => {
      return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(v);
    },
    message: (props: { value: any; }) => `${props.value} не валидный url!`,
  }
});

export default model<IUser>("user", userSchema);
