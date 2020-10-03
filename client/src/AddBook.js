import React from 'react';
import { gql, useQuery} from '@apollo/client';

// Query Books
const AuthorQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

function AddBook() {
    const {loading, error, data} = useQuery(AuthorQuery);
    // console.log(data);

    const authors = () => {
        if(loading)return <option>"Loading"</option>;
        if(error) console.log(error);
        return data.authors.map(authors => (
            <option key={authors.id} value={authors.id}>
                {authors.name}
            </option>
        ));
    }

  return (
    <form id="add-book">
      <div className="field">
          <label>Book name</label>
          <input type="text" />
      </div>

      <div className="field">
          <label>Genre</label>
          <input type="text" />
      </div>

      <div className="field">
          <label>Author</label>
          <select>
              <option>Select author</option>
              {authors()}
          </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default AddBook;
