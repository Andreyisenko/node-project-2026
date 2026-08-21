import express from 'express';
const text = 'Hello data-base';
console.log(text);
const student = {
  id: 123,
  name: 'John Doe',
  age: 16,
  gender: 'male',
  onDuty: false,
};
console.log(student);

const PORT = 3000;
const app = express();
app.use(express.json());
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
