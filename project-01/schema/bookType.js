const authorType = require('./authorType');

const bookType = `
  ${authorType}
  
  input bookInput {
    name: String
    authorId: Int
  }

  type Book {
    id: Int
    name: String
    authorId: Int
    author: Author
  }
  
  type Mutation {
    addNewBook(input: bookInput): Book
  }
`;

module.exports = bookType;