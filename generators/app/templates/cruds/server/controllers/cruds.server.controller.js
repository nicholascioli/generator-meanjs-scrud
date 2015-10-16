'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  <%= crudNameCap %> = mongoose.model('<%= crudNameCap %>'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a <%= crudName %>
 */
exports.create = function (req, res) {
  var <%= crudName %> = new <%= crudNameCap %>(req.body);
  <%= crudName %>.user = req.user;

  <%= crudName %>.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(<%= crudName %>);
    }
  });
};

/**
 * Show the current <%= crudName %>
 */
exports.read = function (req, res) {
  res.json(req.<%= crudName %>);
};

/**
 * Update a <%= crudName %>
 */
exports.update = function (req, res) {
  var <%= crudName %> = req.<%= crudName %>;

  <%= crudName %>.title = req.body.title;
  <%= crudName %>.content = req.body.content;

  <%= crudName %>.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(<%= crudName %>);
    }
  });
};

/**
 * Delete an <%= crudName %>
 */
exports.delete = function (req, res) {
  var <%= crudName %> = req.<%= crudName %>;

  <%= crudName %>.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(<%= crudName %>);
    }
  });
};

/**
 * List of <%= crudNameCap %>s
 */
exports.list = function (req, res) {
  <%= crudNameCap %>.find().sort('-created').populate('user', 'displayName').exec(function (err, <%= crudName %>s) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(<%= crudName %>s);
    }
  });
};

/**
 * <%= crudNameCap %> middleware
 */
exports.<%= crudName %>ByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: '<%= crudNameCap %> is invalid'
    });
  }

  <%= crudNameCap %>.findById(id).populate('user', 'displayName').exec(function (err, <%= crudName %>) {
    if (err) {
      return next(err);
    } else if (!<%= crudName %>) {
      return res.status(404).send({
        message: 'No <%= crudName %> with that identifier has been found'
      });
    }
    req.<%= crudName %> = <%= crudName %>;
    next();
  });
};
