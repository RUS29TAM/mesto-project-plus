import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';

import authMiddleware from './middlewares/auth-middleware';
import unexpectedErrMiddleware from './middlewares/unexpected-err-middleware';

import { DB_URL } from './utils/constants';
import router from './routes/index';

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(DB_URL);

app.use(express.json());
app.use(authMiddleware);
app.use('/', router);
app.use(errors());
app.use(unexpectedErrMiddleware);

app.listen(PORT);
