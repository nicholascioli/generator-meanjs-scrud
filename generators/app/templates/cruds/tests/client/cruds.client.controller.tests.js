'use strict';

(function () {
  // <%= crudNameCap %>s Controller Spec
  describe('<%= crudNameCap %>s Controller Tests', function () {
    // Initialize global variables
    var <%= crudNameCap %>sController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      <%= crudNameCap %>s,
      mock<%= crudNameCap %>;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _<%= crudNameCap %>s_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      <%= crudNameCap %>s = _<%= crudNameCap %>s_;

      // create mock <%= crudName %>
      mock<%= crudNameCap %> = new <%= crudNameCap %>s({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An <%= crudNameCap %> about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the <%= crudNameCap %>s controller.
      <%= crudNameCap %>sController = $controller('<%= crudNameCap %>sController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one <%= crudName %> object fetched from XHR', inject(function (<%= crudNameCap %>s) {
      // Create a sample <%= crudName %>s array that includes the new <%= crudName %>
      var sample<%= crudNameCap %>s = [mock<%= crudNameCap %>];

      // Set GET response
      $httpBackend.expectGET('api/<%= crudName %>s').respond(sample<%= crudNameCap %>s);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.<%= crudName %>s).toEqualData(sample<%= crudNameCap %>s);
    }));

    it('$scope.findOne() should create an array with one <%= crudName %> object fetched from XHR using a <%= crudName %>Id URL parameter', inject(function (<%= crudNameCap %>s) {
      // Set the URL parameter
      $stateParams.<%= crudName %>Id = mock<%= crudNameCap %>._id;

      // Set GET response
      $httpBackend.expectGET(/api\/<%= crudName %>s\/([0-9a-fA-F]{24})$/).respond(mock<%= crudNameCap %>);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.<%= crudName %>).toEqualData(mock<%= crudNameCap %>);
    }));

    describe('$scope.create()', function () {
      var sample<%= crudNameCap %>PostData;

      beforeEach(function () {
        // Create a sample <%= crudName %> object
        sample<%= crudNameCap %>PostData = new <%= crudNameCap %>s({
          title: 'An <%= crudNameCap %> about MEAN',
          content: 'MEAN rocks!'
        });

        // Fixture mock form input values
        scope.title = 'An <%= crudNameCap %> about MEAN';
        scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (<%= crudNameCap %>s) {
        // Set POST response
        $httpBackend.expectPOST('api/<%= crudName %>s', sample<%= crudNameCap %>PostData).respond(mock<%= crudNameCap %>);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the <%= crudName %> was created
        expect($location.path.calls.mostRecent().args[0]).toBe('<%= crudName %>s/' + mock<%= crudNameCap %>._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/<%= crudName %>s', sample<%= crudNameCap %>PostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock <%= crudName %> in scope
        scope.<%= crudName %> = mock<%= crudNameCap %>;
      });

      it('should update a valid <%= crudName %>', inject(function (<%= crudNameCap %>s) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/<%= crudName %>s\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/<%= crudName %>s/' + mock<%= crudNameCap %>._id);
      }));

      it('should set scope.error to error response message', inject(function (<%= crudNameCap %>s) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/<%= crudName %>s\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(<%= crudName %>)', function () {
      beforeEach(function () {
        // Create new <%= crudName %>s array and include the <%= crudName %>
        scope.<%= crudName %>s = [mock<%= crudNameCap %>, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/<%= crudName %>s\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mock<%= crudNameCap %>);
      });

      it('should send a DELETE request with a valid <%= crudName %>Id and remove the <%= crudName %> from the scope', inject(function (<%= crudNameCap %>s) {
        expect(scope.<%= crudName %>s.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.<%= crudName %> = mock<%= crudNameCap %>;

        $httpBackend.expectDELETE(/api\/<%= crudName %>s\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to <%= crudName %>s', function () {
        expect($location.path).toHaveBeenCalledWith('<%= crudName %>s');
      });
    });
  });
}());
