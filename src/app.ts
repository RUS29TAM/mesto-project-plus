import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import cors from 'cors';
import helmet from 'helmet';

import authMiddleware from './middlewares/auth-middleware';
import unexpectedErrMiddleware from './middlewares/unexpected-err-middleware';

import { DB_URL } from './utils/constants';
import router from './routes/index';
import { errorLogger, setupLogger } from './middlewares/logger-middleware';
import { createUserValidation, loginValidation } from './validators/users-validator';
import { createUser, login } from './controllers/users-controller';

const createServer = async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (err) {
    process.exit(1);
  }

  const app = express();
  const { PORT = 3000 } = process.env;

  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(setupLogger);
  app.use('/signin', loginValidation, login);
  app.use('/signup', createUserValidation, createUser);
  app.use(authMiddleware);
  app.use('/', router);
  app.use(errorLogger);
  app.use(errors());
  app.use(unexpectedErrMiddleware);

  app.listen(PORT);
};

createServer();
