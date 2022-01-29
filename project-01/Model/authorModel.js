const mongoose = require('mongoose');
const {Schema} = mongoose

const authorSchema = new Schema({
  name: String,
  books: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Book',
    }
  ]
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;