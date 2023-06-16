import { Request, Response } from "express";
import userModel from "../models/user-model";

export const getUsers = (req: Request, res: Response) => {
  res.send({ users: "Абракадабра" });
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return userModel
    .create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Непредвиденная ошибка" }));
};
