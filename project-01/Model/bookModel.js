const mongoose = require('mongoose');
const {Schema} = mongoose

const bookSchema = new Schema({
  name: String,
  // authorId: mongoose.Schema.ObjectId,

  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'Author'
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;