const express = require('express');
const mongoose = require('mongoose');
const app = express();
const graphqlHttp = require('express-graphql');


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
      io,
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



mongoose.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('GETTING HERE!')
    var kittySchema = new mongoose.Schema({
        name: String
      });
});

app.listen(4000);