import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectToDb } from './db';
import { userRouter } from './modules/users/user.route';

const server = async () => {
  const PORT = process.env.PORT || 5000;
  const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
  const app = express();

  app.use(
    cors({
      origin: [CLIENT_URL, 'https://anihub.icu'],
      credentials: true,
    }),
  );

  app.use('/users', express.json(), userRouter);

  await connectToDb();

  app.listen(PORT, () =>
    console.log(`API is ready on http://localhost:${PORT}`),
  );
};

server();
