import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [2, 'Title must be at least 2 characters'],
    maxlength: [20, 'Title cannot exceed 20 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    minlength: [2, 'Author must be at least 2 characters'],
    maxlength: [20, 'Author cannot exceed 20 characters']
  },
  year: {
    type: Number,
    required: [true, 'Year is required']
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
});

export default mongoose.model('Book', bookSchema);