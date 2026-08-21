import express from 'express';
import dotenv from 'dotenv';
import pino from 'pino-http';
import cors from 'cors';

dotenv.config();
const PORT = Number(process.env.PORT);
const student = {
  id: 23,
  name: 'John Doe',
  age: 16,
  gender: 'male',
  onDuty: false,
};

export const startServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  //   app.use(
  //     pino({
  //       transport: {
  //         target: 'pino-pretty',
  //       },
  //     }),
  //   );

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.get('/', (req, res) => {
    res.json({
      message: 'Good morning everyone',
    });
  });
  app.get('/student', (req, res) => {
    res.json({
      data: student,
    });
  });

  app.get('/book', (req, res) => {
    res.json({
      message: 'Hello Big Book',
    });
  });

  // app.use((req, res, next) => {
  //   res.status(404).json({
  //     message: 'Not found',
  //   });
  // });

  app.get('/error', (req, res, next) => {
    next(new Error('Test error'));
  });
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
