import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/user-model';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import { IUserRequest } from '../interfaces/i-user-request';
import { CREATED, DUPLICATE_KEY_ERROR, JWT_SECRET_KEY } from '../utils/constants';
import ConflictError from '../errors/conflict-error';
import NotAuthError from '../errors/not-auth-error';

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
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;

    const hash = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
      name,
      about,
      avatar,
      password: hash,
      email,
    });

    res.status(CREATED).send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (err: any) {
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError(err.message));
    } else if (err.code === DUPLICATE_KEY_ERROR) {
      next(new ConflictError('Такой e-mail уже существует'));
    } else {
      next(err);
    }
  }
};

const findUser = async (req: IUserRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id ?? req.params.userId;
  const user = await userModel.findById(userId);
  if (!user) {
    return next(new NotFoundError('Пользователь не найден'));
  }
  return res.json({ data: user });
};

export const getCurrentUser = async (req: IUserRequest, res: Response, next: NextFunction) => {
  findUser(req, res, next)
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

export const updateUserData = async (req: IUserRequest, res: Response, next: NextFunction) => {
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

export const updateUserAvatar = async (req: IUserRequest, res: Response, next: NextFunction) => {
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

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select('+password').orFail(() => new NotAuthError('Неправильные почта или пароль'));

    const matched = await bcryptjs.compare(password, user.password);

    if (!matched) {
      return next(new NotAuthError('Неправильные почта или пароль'));
    }

    const token = jwt.sign(
      {
        _id: user._id.toString(),
      },
      JWT_SECRET_KEY,
      {
        expiresIn: '7d',
      },
    );

    return res.send({
      token,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    return next(err);
  }
};
