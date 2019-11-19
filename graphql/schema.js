const { buildSchema } = require("graphql");

var fs = require('fs');

require.extensions['.gql', '.graphql'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

module.exports = buildSchema(require("./schema.graphql"));
