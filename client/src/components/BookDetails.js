import React from 'react';
import { BookQuery } from '../queries';
import { useQuery } from '@apollo/client';
import { useAppContext } from '../lib/contextLib';

function BookDetails() {
    const { chosenBook } = useAppContext();
    const {loading, error, data} = useQuery(BookQuery, {variables: {id: chosenBook}} );

    const book = () => {
        if(loading)return "";
        if(error) {
          console.log(error.message);
          return "Error";
        } else {
          return (
            <div>
              <h2>{data.book.name}</h2>
              <p>Genre: {data.book.genre}</p>
              <p>Author: {data.book.author.name}</p> 
              <h4>Other books by this author:</h4> 
              <ul>
                {data.book.author.otherBooks.length > 0 ?
                  data.book.author.otherBooks.map( book =>(
                    <li key={book.id}>{book.name}</li>
                  )) :
                  <li>None</li>
                }
              </ul> 
          </div>
          );
        }
    }

  return (
    <div id="book-details">
      <h1>Book Details:</h1>
      { book() ? 
        book()
        :
        <p>Click a Book to see Details</p>
      }
    </div>
  );
}

export default BookDetails;
