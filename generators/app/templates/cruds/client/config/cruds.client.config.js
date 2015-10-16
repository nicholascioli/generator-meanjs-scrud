'use strict';

// Configuring the <%= crudNameCap %>s module
angular.module('<%= crudName %>s').run(['Menus',
  function (Menus) {
    // Add the <%= crudName %>s dropdown item
    Menus.addMenuItem('topbar', {
      title: '<%= crudNameCap %>s',
      state: '<%= crudName %>s',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', '<%= crudName %>s', {
      title: 'List <%= crudNameCap %>s',
      state: '<%= crudName %>s.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', '<%= crudName %>s', {
      title: 'Create <%= crudNameCap %>s',
      state: '<%= crudName %>s.create',
      roles: ['user']
    });
  }
]);
