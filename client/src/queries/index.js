import {gql} from '@apollo/client';

// Query Authors
const AuthorQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;


// Query Books
const BooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

// Fetch a Book
const BookQuery = gql`
    query Book($id: ID!) {
        book (id:$id){
            name
            genre
            author{
                name
            }
        }
    }
`;

const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name:$name, genre:$genre, authorId:$authorId){
            name
            id
        }
    }
`;

export { 
    AuthorQuery, 
    BooksQuery, 
    addBookMutation,
    BookQuery,
};