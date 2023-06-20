import { model, Schema } from "mongoose";
import { ICard } from "../interfaces/i-card";

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
      validator: (v: any) => {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(v);
      },
      message: (props) => `${props.value} не валидный url!`,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  likes: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default model("card", cardSchema);
