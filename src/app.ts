import express from "express";
import mongoose from "mongoose";
import { errors } from "celebrate";

import usersRoute from "./routes/users-routes";
import cardsRoutes from "./routes/cards-routes";
import authMiddleware from "./middlewares/auth-middleware";
import NotFoundError from "./errors/not-found-error";
import unexpectedErrMiddleware from "./middlewares/unexpected-err-middleware";
// eslint-disable-next-line import/named
import { DB_URL } from "./utils/constants";

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(DB_URL);

app.use(express.json());
app.use(authMiddleware);
app.use("/users", usersRoute);
app.use("/cards", cardsRoutes);

app.use((req, res, next) => {
  next(new NotFoundError("Не существующая страница"));
});

app.use(errors());
app.use(unexpectedErrMiddleware);

app.listen(PORT, () => {
  console.log(`Слушаем порт ${PORT}`);
});
