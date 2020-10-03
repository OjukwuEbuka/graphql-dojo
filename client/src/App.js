import React, { useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';

//Components
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';
import { AppContext } from './lib/contextLib';

// Set up Apollo
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})


function App() {
  const [chosenBook, setBook] = useState("");

  return (
    <AppContext.Provider value={{chosenBook, setBook}}>
      <ApolloProvider client={client}>
        <div className="main">
          <h1>Ninja's Reading List</h1>
          <BookList />
          <BookDetails />
          <AddBook />
        </div>
      </ApolloProvider>
    </AppContext.Provider>
  );
}

export default App;
