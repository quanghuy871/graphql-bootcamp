import React, {useEffect, useRef, useState} from "react";
import {useQuery, useMutation} from "@apollo/client";
import {GET_AUTHORS_QUERY, ADD_BOOK_MUTATION, GET_BOOKS_QUERY} from "../../queries/queries";

function ContentAddBook() {
  const [state, setState] = useState({name: "", authorId: ""});
  const nameInput = useRef();
  const authorInput = useRef();
  const {loading: queryLoading, error: queryError, data: queryData} = useQuery(GET_AUTHORS_QUERY);
  const [addBook, {
    data: mutationData,
    loading: mutationLoading,
    error: mutationError
  }] = useMutation(ADD_BOOK_MUTATION);

  const getAuthors = () => {
    if (queryLoading) {
      return;
    }

    if (!queryLoading) {
      return queryData.authors.map((el, index) => <option key={index} value={el.id}>{el.name}</option>);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: state.name,
        author: state.authorId,
      },
      refetchQueries: [{query: GET_BOOKS_QUERY}],
    });
  }

  return (
    <div className='content-add-book'>
      <form id="add-book" onSubmit={submitHandler}>
        <div className="field">
          <label>Book name:</label>
          <input onChange={(e) => setState((prev) => {
            return {
              ...prev,
              name: e.target.value,
            }
          })} type="text"/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => setState((prev) => {
            return {
              ...prev,
              authorId: e.target.value,
            }
          })}>
            <option>Select Author</option>
            {getAuthors()};
          </select>
        </div>

        <button>Add Book</button>
      </form>
    </div>
  );
}

export default ContentAddBook;