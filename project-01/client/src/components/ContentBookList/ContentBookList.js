import React from "react";
import {gql, useQuery} from "@apollo/client";

const GET_BOOKS_QUERY = gql`
    {
        books {
            id
            name
        }
    }
`;

function ContentBookList() {
  const {loading, error, data} = useQuery(GET_BOOKS_QUERY);

  const getBooks = () => {
    if (loading) {
      return <div>Loading...</div>
    }

    if (!loading) {
      return data.books.map((el, index) => <li key={index}>{el.name}</li>);
    }
  }

  return (
    <div className='content-book-list'>
      <ul>
        {getBooks()}
      </ul>
    </div>
  );
}

export default ContentBookList;