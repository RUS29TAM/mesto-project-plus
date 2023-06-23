import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

import userModel from '../models/user-model';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import { IHardcoreReq } from '../interfaces/i-hardcore-req';
import { OK } from '../utils/constants';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send(user);
  } catch (err) {
    if (err instanceof Error.CastError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  try {
    const user = await userModel.create({ name, about, avatar });
    res.status(OK).send({ data: user });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

const findUser = async (req: IHardcoreReq, res: Response, next: NextFunction) => {
  const userId = req.user?._id ?? req.params.userId;
  const user = await userModel.findById(userId);
  if (!user) {
    return next(new NotFoundError('Пользователь не найден'));
  }
  return res.json({ data: user });
};

export const getCurrentUser = async (req: IHardcoreReq, res: Response, next: NextFunction) => {
  findUser(req, res, next)
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

export const updateUserData = async (req: IHardcoreReq, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const userId = req.user?._id;

  try {
    const user = await userModel.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send(user);
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

export const updateUserAvatar = async (req: IHardcoreReq, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const userId = req.user?._id;

  try {
    const user = await userModel.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send(user);
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};
