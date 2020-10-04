import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { BooksQuery } from '../queries';
import { useAppContext } from '../lib/contextLib';

function BookList() {
    const {loading, error, data} = useQuery(BooksQuery);
    const { setBook } = useAppContext();
    // console.log(data);

    useEffect(() => {
      if(data && data.books){
        setBook(data.books[0].id);
      }
    }, [data, setBook])
    
    const handleClick = (e) => {
      setBook(e.target.getAttribute('id'));
    }

    const books = () => {
        if(loading)return <li>Loading</li>;
        if(error) {
          console.log(error);
          return "";
        } else {
          let books = [...data.books];
          return books.map(book => <li id={book.id} key={book.id} onClick={handleClick}>{book.name}</li>);
        }
    }

  return (
    <div id="book-list">
      <ul>
          {books()}
      </ul>
    </div>
  );
}

export default BookList;
