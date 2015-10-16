'use strict';

//<%= crudNameCap %>s service used for communicating with the <%= crudName %>s REST endpoints
angular.module('<%= crudName %>s').factory('<%= crudNameCap %>s', ['$resource',
  function ($resource) {
    return $resource('api/<%= crudName %>s/:<%= crudName %>Id', {
      <%= crudName %>Id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
