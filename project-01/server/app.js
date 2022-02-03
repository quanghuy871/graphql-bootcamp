const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const cors = require('cors');

const app = express();
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const mongoose = require('mongoose');
const port = process.env.PORT;

const Book = require('./Model/bookModel');
const Author = require('./Model/authorModel');

mongoose.connect(process.env.DATABASE).then(() => {
  console.log('Database successfully connected')
});

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  input bookInput {
    name: String
    author: ID
  }
  
  input authorInput {
    id: ID
    name: String
    books: [ID]
  }

  type Book {
    id: ID
    name: String
    author: Author
  }
  
  type Author {
    id: ID
    name: String
    books: [Book]
  }
  
  type Query {
    books: [Book]
    book (id: ID): Book
    
    authors: [Author]
    author (id: ID): Author
  }
  
  type Mutation {
    addNewBook(input: bookInput): Book
    addNewAuthor(input: authorInput): Author
    updateAuthor(input: authorInput): Author
  }
`);

const helperFunction = async (type) => {
  const authors = await Author.find().populate('books');
  const books = await Book.find().populate('author');

  return type === 'books' ? books : authors;
}

// The root provides a resolver function for each API endpoint
const root = {
  book: async (args) => {
    const book = await Book.findById(args.id).populate('author');
    await book.author.populate('books');
    return book;
  },

  books: () => {
    return helperFunction('books');
  },

  addNewBook: ({input}) => {
    const newBook = Book.create({...input});
    return newBook;
  },

  addNewAuthor: ({input}) => {
    const newAuthor = Author.create({...input});
    return newAuthor;
  },

  updateAuthor: ({input}) => {
    const updatedAuthor = Author.findByIdAndUpdate(input.id, {...input});
    return updatedAuthor;
  },

  author: (args) => {
    helperFunction('books');
    return authors.find(el => el.id === args.id);
  },

  authors: () => {
    return helperFunction('authors');
  }
};

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
  console.log('App listen to port 3000');
});