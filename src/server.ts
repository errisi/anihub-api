import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectToDb } from './db';
import { userRouter } from './modules/users/user.route';
import { errorMiddleware } from './middlewares/errorMiddleware';
import cookieParser from 'cookie-parser';

const server = async () => {
  const PORT = process.env.PORT || 5000;
  const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
  const app = express();

  app.use(cookieParser());
  app.use(express.json());

  app.use(
    cors({
      origin: [CLIENT_URL, 'https://anihub.icu'],
      credentials: true,
    }),
  );

  app.use('/users', express.json(), userRouter);

  await connectToDb();

  app.use(errorMiddleware);

  app.listen(PORT, () =>
    console.log(`API is ready on http://localhost:${PORT}`),
  );
};

server();
