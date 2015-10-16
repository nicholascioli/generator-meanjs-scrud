'use strict';

// Setting up route
angular.module('<%= crudName %>s').config(['$stateProvider',
  function ($stateProvider) {
    // <%= crudNameCap %>s state routing
    $stateProvider
      .state('<%= crudName %>s', {
        abstract: true,
        url: '/<%= crudName %>s',
        template: '<ui-view/>'
      })
      .state('<%= crudName %>s.list', {
        url: '',
        templateUrl: 'modules/<%= crudName %>s/client/views/list-<%= crudName %>s.client.view.html'
      })
      .state('<%= crudName %>s.create', {
        url: '/create',
        templateUrl: 'modules/<%= crudName %>s/client/views/create-<%= crudName %>.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('<%= crudName %>s.view', {
        url: '/:<%= crudName %>Id',
        templateUrl: 'modules/<%= crudName %>s/client/views/view-<%= crudName %>.client.view.html'
      })
      .state('<%= crudName %>s.edit', {
        url: '/:<%= crudName %>Id/edit',
        templateUrl: 'modules/<%= crudName %>s/client/views/edit-<%= crudName %>.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
