import express from 'express';
// import dotenv from 'dotenv';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
// import StudentCollection from './db/models/student.js';
import { getStudents, getStudentsById } from './services/Students.js';
// dotenv.config();
// console.log(dotenv.config());
// console.log(+process.env.PORT);
// console.log(dotenv.config());

const PORT = Number(getEnvVar('PORT', 3000));
// const student = {
//   id: 23,
//   name: 'John Doe',
//   age: 16,
//   gender: 'male',
//   onDuty: false,
// };

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
  app.get('/api/student', async (req, res) => {
    const data = await getStudents();
    res.json({
      status: 200,
      message: 'Successfully find students',
      data: data,
    });
  });
  app.get('/api/student/:id', async (req, res) => {
    const { id } = req.params;

    const data = await getStudentsById(id);

    console.log(data);
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Student whit id ${id} Not Found `,
      });
    }

    res.json({
      status: 200,
      message: `Successfully find students by id ${id} `,
      data,
    });
  });

  app.get('/book', (req, res) => {
    res.json({
      message: 'Hello Big Book',
    });
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
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
