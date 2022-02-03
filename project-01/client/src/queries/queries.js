import {gql} from "@apollo/client";

const GET_BOOKS_QUERY = gql`
    {
        books {
            id
            name
        }
    }
`;

const GET_AUTHORS_QUERY = gql`
    {
        authors {
            id
            name
        }
    }
`;

const ADD_BOOK_MUTATION = gql`
    mutation ($name: String!, $author: ID!){
        addNewBook (input: {
            name: $name,
            author: $author
        }) {
            name
            id
        }
    }
`;

const GET_BOOK_QUERY = gql`
    query ($id: ID!){
        book(id: $id) {
            id
            name
            author {
                id
                name
                books {
                    name
                }
            }
        }
    }
`;


export {GET_AUTHORS_QUERY, GET_BOOKS_QUERY, ADD_BOOK_MUTATION, GET_BOOK_QUERY};