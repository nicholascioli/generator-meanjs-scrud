'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    // Setup arguments
    this.argument('modulename', { type: String, required: true });
    this.modulename = _.camelCase(this.modulename);
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'A simple CRUD generator to simplify things: ' + chalk.red('MeanjsScrud')
    ));

    var prompts = [{
      type: 'confirm',
      name: 'doTheThing',
      message: 'Would you like to generate the simple CRUD module ' + this.modulename + '?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      if (this.props.doTheThing)
      {
        var parent = this;

        this.directory(this.templatePath(), this.templatePath(), function (body, src, des, options) { 
          des = src.replace(parent.templatePath(), 
            parent.destinationPath('modules')).replace(/crud/g, parent.modulename);
          
          parent.fs.copyTpl(src, des, 
            {
              crudName: parent.modulename, 
              crudNameCap: _.capitalize(parent.modulename) 
            }
          ); 

          return body;
        });
      } else {
        this.log("Exiting!");
      }
    },
  },

  install: function () {
    // This is probably optional
    this.installDependencies();
  }
});
