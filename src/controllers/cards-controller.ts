import { Request, Response, NextFunction } from "express";
import { ObjectId, Error } from "mongoose";
import { IHardcoreRequest } from "../interfaces/i-hardcore-request";
import NotFoundError from "../errors/not-found-error";
import BadRequestError from "../errors/bad-request-error";
import cardModel from "../models/card-model";

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await cardModel.find({});
    res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

export const createCard = async (req: IHardcoreRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  try {
    const card = await cardModel.create({ name, link, owner });
    res.status(200).send({ data: card });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

export const deleteCardById = async (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  try {
    const card = await cardModel.findByIdAndDelete(cardId).orFail(() => new NotFoundError("Карточка не найдена"));
    res.status(200).send({ data: card });
  } catch (err) {
    if (err instanceof Error.CastError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

export const likeCardById = async (req: IHardcoreRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  try {
    const card = await cardModel
      .findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: req.user?._id } },
        { new: true },
      )
      .orFail(() => new NotFoundError("Карточка не найдена"));
    res.status(200).send({ data: card });
  } catch (err) {
    if (err instanceof Error.CastError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

export const dislikeCardById = async (req: IHardcoreRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { cardId } = req.params;

  try {
    const card = await cardModel
      .findByIdAndUpdate(
        cardId,
        { $pull: { likes: userId as unknown as ObjectId } },
        { new: true },
      )
      .orFail(() => new NotFoundError("Карточка не найдена"));
    res.status(200).send({ data: card });
  } catch (err) {
    if (err instanceof Error.CastError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};
