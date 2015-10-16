'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  <%= crudNameCap %> = mongoose.model('<%= crudNameCap %>'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, <%= crudName %>;

/**
 * <%= crudNameCap %> routes tests
 */
describe('<%= crudNameCap %> CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new <%= crudName %>
    user.save(function () {
      <%= crudName %> = {
        title: '<%= crudNameCap %> Title',
        content: '<%= crudNameCap %> Content'
      };

      done();
    });
  });

  it('should be able to save an <%= crudName %> if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new <%= crudName %>
        agent.post('/api/<%= crudName %>s')
          .send(<%= crudName %>)
          .expect(200)
          .end(function (<%= crudName %>SaveErr, <%= crudName %>SaveRes) {
            // Handle <%= crudName %> save error
            if (<%= crudName %>SaveErr) {
              return done(<%= crudName %>SaveErr);
            }

            // Get a list of <%= crudName %>s
            agent.get('/api/<%= crudName %>s')
              .end(function (<%= crudName %>sGetErr, <%= crudName %>sGetRes) {
                // Handle <%= crudName %> save error
                if (<%= crudName %>sGetErr) {
                  return done(<%= crudName %>sGetErr);
                }

                // Get <%= crudName %>s list
                var <%= crudName %>s = <%= crudName %>sGetRes.body;

                // Set assertions
                (<%= crudName %>s[0].user._id).should.equal(userId);
                (<%= crudName %>s[0].title).should.match('<%= crudNameCap %> Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an <%= crudName %> if not logged in', function (done) {
    agent.post('/api/<%= crudName %>s')
      .send(<%= crudName %>)
      .expect(403)
      .end(function (<%= crudName %>SaveErr, <%= crudName %>SaveRes) {
        // Call the assertion callback
        done(<%= crudName %>SaveErr);
      });
  });

  it('should not be able to save an <%= crudName %> if no title is provided', function (done) {
    // Invalidate title field
    <%= crudName %>.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new <%= crudName %>
        agent.post('/api/<%= crudName %>s')
          .send(<%= crudName %>)
          .expect(400)
          .end(function (<%= crudName %>SaveErr, <%= crudName %>SaveRes) {
            // Set message assertion
            (<%= crudName %>SaveRes.body.message).should.match('Title cannot be blank');

            // Handle <%= crudName %> save error
            done(<%= crudName %>SaveErr);
          });
      });
  });

  it('should be able to update an <%= crudName %> if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new <%= crudName %>
        agent.post('/api/<%= crudName %>s')
          .send(<%= crudName %>)
          .expect(200)
          .end(function (<%= crudName %>SaveErr, <%= crudName %>SaveRes) {
            // Handle <%= crudName %> save error
            if (<%= crudName %>SaveErr) {
              return done(<%= crudName %>SaveErr);
            }

            // Update <%= crudName %> title
            <%= crudName %>.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing <%= crudName %>
            agent.put('/api/<%= crudName %>s/' + <%= crudName %>SaveRes.body._id)
              .send(<%= crudName %>)
              .expect(200)
              .end(function (<%= crudName %>UpdateErr, <%= crudName %>UpdateRes) {
                // Handle <%= crudName %> update error
                if (<%= crudName %>UpdateErr) {
                  return done(<%= crudName %>UpdateErr);
                }

                // Set assertions
                (<%= crudName %>UpdateRes.body._id).should.equal(<%= crudName %>SaveRes.body._id);
                (<%= crudName %>UpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of <%= crudName %>s if not signed in', function (done) {
    // Create new <%= crudName %> model instance
    var <%= crudName %>Obj = new <%= crudNameCap %>(<%= crudName %>);

    // Save the <%= crudName %>
    <%= crudName %>Obj.save(function () {
      // Request <%= crudName %>s
      request(app).get('/api/<%= crudName %>s')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single <%= crudName %> if not signed in', function (done) {
    // Create new <%= crudName %> model instance
    var <%= crudName %>Obj = new <%= crudNameCap %>(<%= crudName %>);

    // Save the <%= crudName %>
    <%= crudName %>Obj.save(function () {
      request(app).get('/api/<%= crudName %>s/' + <%= crudName %>Obj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', <%= crudName %>.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single <%= crudName %> with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/<%= crudName %>s/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', '<%= crudNameCap %> is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single <%= crudName %> which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent <%= crudName %>
    request(app).get('/api/<%= crudName %>s/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No <%= crudName %> with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an <%= crudName %> if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new <%= crudName %>
        agent.post('/api/<%= crudName %>s')
          .send(<%= crudName %>)
          .expect(200)
          .end(function (<%= crudName %>SaveErr, <%= crudName %>SaveRes) {
            // Handle <%= crudName %> save error
            if (<%= crudName %>SaveErr) {
              return done(<%= crudName %>SaveErr);
            }

            // Delete an existing <%= crudName %>
            agent.delete('/api/<%= crudName %>s/' + <%= crudName %>SaveRes.body._id)
              .send(<%= crudName %>)
              .expect(200)
              .end(function (<%= crudName %>DeleteErr, <%= crudName %>DeleteRes) {
                // Handle <%= crudName %> error error
                if (<%= crudName %>DeleteErr) {
                  return done(<%= crudName %>DeleteErr);
                }

                // Set assertions
                (<%= crudName %>DeleteRes.body._id).should.equal(<%= crudName %>SaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an <%= crudName %> if not signed in', function (done) {
    // Set <%= crudName %> user
    <%= crudName %>.user = user;

    // Create new <%= crudName %> model instance
    var <%= crudName %>Obj = new <%= crudNameCap %>(<%= crudName %>);

    // Save the <%= crudName %>
    <%= crudName %>Obj.save(function () {
      // Try deleting <%= crudName %>
      request(app).delete('/api/<%= crudName %>s/' + <%= crudName %>Obj._id)
        .expect(403)
        .end(function (<%= crudName %>DeleteErr, <%= crudName %>DeleteRes) {
          // Set message assertion
          (<%= crudName %>DeleteRes.body.message).should.match('User is not authorized');

          // Handle <%= crudName %> error error
          done(<%= crudName %>DeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      <%= crudNameCap %>.remove().exec(done);
    });
  });
});
