import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const server = async () => {
  const PORT = process.env.PORT || 5000;
  const CLIENT_URL = 'http://localhost:3000';
  const app = express();

  app.use(
    cors({
      origin: [CLIENT_URL, 'https://anihub.icu'],
    }),
  );

  app.use('/users', express.json(), (req, res) => res.send('hello'));

  app.listen(PORT, () =>
    console.log(`API is ready on http://localhost:${PORT}`),
  );
};

server();
