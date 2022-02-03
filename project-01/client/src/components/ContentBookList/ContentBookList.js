import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_BOOKS_QUERY} from "../../queries/queries";
import ContentBookDetail from "../ContentBookDetail/ContentBookDetail";

function ContentBookList() {
  const [state, setState] = useState("");
  const {loading, error, data} = useQuery(GET_BOOKS_QUERY);

  const getBooks = () => {
    if (loading) {
      return <div>Loading...</div>
    }

    if (!loading) {
      return data.books.map((el, index) => <li onClick={() => setState(el.id)} key={index}>{el.name}</li>);
    }
  }

  return (
    <div className='content-book-list'>
      <ul>
        {getBooks()}
      </ul>

      <ContentBookDetail bookId={state}/>
    </div>
  );
}

export default ContentBookList;