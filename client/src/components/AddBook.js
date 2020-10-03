import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AuthorQuery, addBookMutation, BooksQuery } from '../queries';

function AddBook() {
    const {loading, error, data} = useQuery(AuthorQuery);
    const [inputVal, setInputVal] = useState({name:'',genre:'',authorId:''});
    const [addBook] = useMutation(addBookMutation);
    // console.log(data);

    const authors = () => {
        if(loading)return <option>"Loading"</option>;
        if(error) console.log(error);
        return data.authors.map(authors => (
            <option key={authors.id} value={authors.id}>
                {authors.name}
            </option>
        ));
    };

    const handleChange = e => {
        setInputVal({
            ...inputVal,
            [e.target.name]: e.target.value}
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let addVal = await addBook({ 
            variables: {
                name: inputVal.name,
                genre: inputVal.genre,
                authorId: inputVal.authorId
            },
            refetchQueries: [{query: BooksQuery}]
        });
        console.log(addVal);
    }

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
          <label>Book name</label>
          <input 
            type="text" value={inputVal.name} 
            name="name" onChange={handleChange}
            />
      </div>

      <div className="field">
          <label>Genre</label>
          <input 
            type="text"  value={inputVal.genre}
            name="genre" onChange={handleChange}
          />
      </div>

      <div className="field">
          <label>Author</label>
          <select name="authorId"
            onChange={handleChange}
          >
              <option>Select author</option>
              {authors()}
          </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default AddBook;
