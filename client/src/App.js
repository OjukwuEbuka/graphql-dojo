import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';

//Components
import BookList from './BookList';
import AddBook from './AddBook';

// Set up Apollo
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <h1>Ninja's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
