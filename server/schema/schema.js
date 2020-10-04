const graphql = require("graphql");
const Book = require('../models/Book');
const Author = require('../models/Author');
const mongoose = require('mongoose');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID, 
    GraphQLInt, 
    GraphQLList,
    GraphQLNonNull,
} = graphql;

// const books = [
//     {name: "Harry Potter and the Philosopher's Stone", genre: "Fantasy", id: "1", authorId: "4"},
//     {name: "The Eye of the World", genre: "Fantasy", id: "2", authorId: "1"},
//     {name: "The Alchemist", genre: "Adventure", id: "3", authorId: "3"},
//     {name: "The Ring'O'Bells Mystery", genre: "Adventure", id: "4", authorId: "5"},
//     {name: "The Bourne Identity", genre: "Action", id: "5", authorId: "2"},
//     {name: "Harry Potter and the Prisoner of Azkaban", genre: "Fantasy", id: "6", authorId: "4"},
//     {name: "The Bourne Supremacy", genre: "Action", id: "7", authorId: "2"},
// ]

// const authors = [
//     {name: "Robert Jordan", age: 58, id: "1"},
//     {name: "Robert Ludlum", age: 88, id: "2"},
//     {name: "Paulo Coelho", age: 72, id: "3"},
//     {name: "J. K. Rowling", age: 59, id: "4"},
//     {name: "Enid Blyton", age: 98, id: "5"},
// ]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                // return authors.find(({id}) => id == parent.authorId)
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books.filter(({authorId}) => authorId == parent.id)
                return Book.find({authorId: parent.id});
            }
        },
        otherBooks: {
            type: new GraphQLList(BookType),
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Book.find({authorId: parent.id, _id: {$ne: args.id}});
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db or source
                // return books.find(({id}) => id == args.id )
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // return authors.find(({id}) => id == args.id )
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books
                return Book.find();
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors
                return Author.find();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString) },
                age: {type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let author = new Author({...args});
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({...args});
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});