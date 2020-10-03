import React from 'react';
import { useQuery} from '@apollo/client';
import { BookQuery } from '../queries';
import { useAppContext } from '../lib/contextLib';

function BookDetails() {
    const { chosenBook } = useAppContext();
    const {loading, error, data} = useQuery(BookQuery, {variables: {id: chosenBook}});
    // console.log(data);

    const book = () => {
        if(loading)return <li>Loading</li>;
        if(error) {
          console.log(error.message);
          return "";
        } else {
          return <div>{data.book.name}</div>;
        }
    }

  return (
    <div id="book-details">
      {book()}
    </div>
  );
}

export default BookDetails;
