import React from 'react';
import { gql, useQuery} from '@apollo/client';

// Query Books
const BookQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

function BookList() {
    const {loading, error, data} = useQuery(BookQuery);
    // console.log(data);

    const books = () => {
        if(loading)return <li>Loading</li>;
        if(error) console.log(error);
        return data.books.map(book => <li key={book.id}>{book.name}</li>);
    }

  return (
    <div className="main">
      <ul>
          {books()}
      </ul>
    </div>
  );
}

export default BookList;
