import express from 'express';
import User from '../models/User.js';
import Book from '../models/Book.js';

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const books = await Book.find({ borrowedBy: user._id });
    res.json(books);
  } catch (err) {
    next(err);
  }
});

router.post('/:bookId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (book.borrowedBy) {
      return res.status(400).json({ message: 'Book already borrowed' });
    }
    book.borrowedBy = user._id;
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

router.delete('/:bookId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (!book.borrowedBy || book.borrowedBy.toString() !== user._id.toString()) {
      return res.status(400).json({ message: 'Book is not borrowed by this user' });
    }
    book.borrowedBy = null;
    await book.save();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;