const bookType = require('./bookType');

const authorType = `
  ${bookType}

  type Author {
    id: Int
    name: String
    books: [Book]
  }
`;

module.exports = authorType;