'use strict';

// <%= crudNameCap %>s controller
angular.module('<%= crudName %>s').controller('<%= crudNameCap %>sController', ['$scope', '$stateParams', '$location', 'Authentication', '<%= crudNameCap %>s',
  function ($scope, $stateParams, $location, Authentication, <%= crudNameCap %>s) {
    $scope.authentication = Authentication;

    // Create new <%= crudNameCap %>
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', '<%= crudName %>Form');

        return false;
      }

      // Create new <%= crudNameCap %> object
      var <%= crudName %> = new <%= crudNameCap %>s({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      <%= crudName %>.$save(function (response) {
        $location.path('<%= crudName %>s/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing <%= crudNameCap %>
    $scope.remove = function (<%= crudName %>) {
      if (<%= crudName %>) {
        <%= crudName %>.$remove();

        for (var i in $scope.<%= crudName %>s) {
          if ($scope.<%= crudName %>s[i] === <%= crudName %>) {
            $scope.<%= crudName %>s.splice(i, 1);
          }
        }
      } else {
        $scope.<%= crudName %>.$remove(function () {
          $location.path('<%= crudName %>s');
        });
      }
    };

    // Update existing <%= crudNameCap %>
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', '<%= crudName %>Form');

        return false;
      }

      var <%= crudName %> = $scope.<%= crudName %>;

      <%= crudName %>.$update(function () {
        $location.path('<%= crudName %>s/' + <%= crudName %>._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of <%= crudNameCap %>s
    $scope.find = function () {
      $scope.<%= crudName %>s = <%= crudNameCap %>s.query();
    };

    // Find existing <%= crudNameCap %>
    $scope.findOne = function () {
      $scope.<%= crudName %> = <%= crudNameCap %>s.get({
        <%= crudName %>Id: $stateParams.<%= crudName %>Id
      });
    };
  }
]);
