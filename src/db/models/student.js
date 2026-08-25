import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other'],
    default: 'male',
    require: true,
  },
});

const StudentCollection = model('student', studentSchema);

export default StudentCollection;
