const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const { MONGO_URI } = require("./config/dev");

const app = express();

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

mongoose.connect(MONGO_URI);
mongoose.connection.once('open', () => console.log("Connected to MongoDB"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("App is listening on port: " + PORT);
})