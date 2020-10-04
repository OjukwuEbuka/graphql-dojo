import React, { useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';

//Components
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';
import { bookDetailContext } from './lib/contextLib';

// Set up Apollo
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})


function App() {
  const [chosenBook, setBook] = useState(null);

  return (
    <ApolloProvider client={client}>
        <div id="main">
          <h1>Ninja's Reading List</h1>
          <bookDetailContext.Provider value={{chosenBook, setBook}}>
            <BookList />
            <BookDetails />
          </bookDetailContext.Provider>
          <AddBook />
        </div>
    </ApolloProvider>
  );
}

export default App;
