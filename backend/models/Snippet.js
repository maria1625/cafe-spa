import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  language: {
    type: String,
    enum: ['javascript', 'python', 'java', 'css', 'html', 'sql', 'typescript', 'react', 'node', 'other'],
    default: 'other'
  },
  code: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Snippet', snippetSchema);
