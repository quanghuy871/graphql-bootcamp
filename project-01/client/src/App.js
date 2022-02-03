import './App.css';
import ContentBookList from "./components/ContentBookList/ContentBookList";
import ContentAddBook from "./components/ContentAddBook/ContentAddBook";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql?', // specifies the URL of our GraphQL server.
  cache: new InMemoryCache(), // is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>READING LIST</h1>

        <ContentBookList/>

        <ContentAddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;
