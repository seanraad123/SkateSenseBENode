const express = require('express');
const mongoose = require('mongoose');
const app = express();
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');


app.use(
  '/graphql',
  graphqlHttp(async (request, response, graphQLParams) => ({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    context: {
      request,
      response,
      graphQLParams,
    },
    customFormatErrorFn: error => {
      console.log(error);

      return ({
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
      })

    }
  }))
);



mongoose.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
app.listen(4000);