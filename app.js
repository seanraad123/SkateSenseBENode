const express = require('express');
const mongoose = require('mongoose');
const app = express();
const graphqlExpress = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const auth = require('./middleware/auth');
require('dotenv').config();

app.use(bodyParser({ limit: '20mb' }));

app.use(auth);

// const loggingMiddleware = (req, res, next) => {
//   console.log('ip:', req);
//   next();
// };

// app.use(loggingMiddleware);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(async (request, response, graphQLParams) => ({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    context: {
      request,
      response,
      graphQLParams,
    },
    customFormatErrorFn: (error) => {
      console.log(error);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
      };
    },
  }))
);

app.use((error, req, res, next) => {
  //console.log('THIS HIT!');
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose.connect(process.env.DB_HOSTNAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
app.listen(process.env.PORT);
