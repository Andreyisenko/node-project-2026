import StudentCollection from '../db/models/student.js';

export const getStudents = () => StudentCollection.find();

export const getStudentsById = (id) => StudentCollection.findOne({ _id: id });
