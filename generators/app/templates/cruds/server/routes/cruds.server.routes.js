'use strict';

/**
 * Module dependencies.
 */
var <%= crudName %>sPolicy = require('../policies/<%= crudName %>s.server.policy'),
  <%= crudName %>s = require('../controllers/<%= crudName %>s.server.controller');

module.exports = function (app) {
  // <%= crudNameCap %>s collection routes
  app.route('/api/<%= crudName %>s').all(<%= crudName %>sPolicy.isAllowed)
    .get(<%= crudName %>s.list)
    .post(<%= crudName %>s.create);

  // Single <%= crudName %> routes
  app.route('/api/<%= crudName %>s/:<%= crudName %>Id').all(<%= crudName %>sPolicy.isAllowed)
    .get(<%= crudName %>s.read)
    .put(<%= crudName %>s.update)
    .delete(<%= crudName %>s.delete);

  // Finish by binding the <%= crudName %> middleware
  app.param('<%= crudName %>Id', <%= crudName %>s.<%= crudName %>ByID);
};
