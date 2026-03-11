import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [20, 'First name cannot exceed 20 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [20, 'Last name cannot exceed 20 characters']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [5, 'Username must be exactly 5 characters'],
    maxlength: [5, 'Username must be exactly 5 characters'],
    unique: true
  }
});

export default mongoose.model('User', userSchema);