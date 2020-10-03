const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const { MONGO_URI } = require("./config/dev");
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

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