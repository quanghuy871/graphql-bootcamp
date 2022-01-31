import React from "react";
import {gql, useQuery} from "@apollo/client";

const GET_AUTHORS_QUERY = gql`
    {
        authors {
            id
            name
        }
    }
`;

function ContentAddBook() {
  const {loading, error, data} = useQuery(GET_AUTHORS_QUERY);

  const getAuthors = () => {
    if (loading) {
      return;
    }

    if (!loading) {
      return data.authors.map((el, index) => <option key={index} value={el.id}>{el.name}</option>);
    }
  }

  return (
    <div className='content-add-book'>
      <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text"/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select>
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