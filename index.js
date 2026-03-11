import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import usersRouter from './routes/users.js';
import booksRouter from './routes/books.js';
import userBooksRouter from './routes/userBooks.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(morgan('tiny'));

app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/users/:userId/books', userBooksRouter);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});