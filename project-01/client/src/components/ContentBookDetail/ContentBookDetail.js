import React, {Fragment} from "react";
import {useQuery} from "@apollo/client";
import {GET_BOOK_QUERY} from "../../queries/queries";

function ContentBookDetail(props) {
  const {loading, error, data} = useQuery(GET_BOOK_QUERY, {
    variables: {
      id: props.bookId
    }
  });

  const getBook = () => {
    if (loading) {
      return <div>...LOADING</div>
    }

    if (!data) {
      return <></>;
    } else {
      const {book} = data;
      return (
        <Fragment>
          <p>{book.name}</p>
          <p>{book.author.name}</p>
          <h5>All books by author:</h5>
          <ul>
            {book.author.books.map((el, index) => <li key={index}>{el.name}</li>)}
          </ul>
        </Fragment>
      );
    }
  }

  return (
    <div>
      <h4>Book Detail:</h4>
      {getBook()}
    </div>
  );
}

export default ContentBookDetail;