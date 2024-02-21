import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectToDb } from './db';
import { userRouter } from './modules/users/user.route';
import { errorMiddleware } from './middlewares/errorMiddleware';
import cookieParser from 'cookie-parser';
import { notificationsRouter } from './modules/notifications/notifications.route';
import { commentsRouter } from './modules/comments/comments.route';

const server = async () => {
  const PORT = process.env.PORT || 5000;
  const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
  const app = express();

  app.use(cookieParser());
  app.use(express.json());

  app.use(
    cors({
      origin: [
        CLIENT_URL,
        'https://anihub.icu',
        'https://errisi.github.io',
        'http://localhost:5173',
      ],
      credentials: true,
    }),
  );

  app.use('/users', express.json(), userRouter);
  app.use('/notifications', express.json(), notificationsRouter);
  app.use('/comments', express.json(), commentsRouter);

  await connectToDb();

  app.use(errorMiddleware);

  app.listen(PORT, () =>
    console.log(`API is ready on http://localhost:${PORT}`),
  );
};

server();
