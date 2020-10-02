const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const books = [
    {name: "The Philosopher's Stone", genre: "Fantasy", id: "1"},
    {name: "The Eye of the World", genre: "Fantasy", id: "2"},
    {name: "The Alchemist", genre: "Adventure", id: "3"},
    {name: "The Ring'O'Bells Mystery", genre: "Adventure", id: "4"},
    {name: "The Bourne Identity", genre: "Action", id: "5"},
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                // code to get data from db or source
                return books.find(({id}) => id == args.id )
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});