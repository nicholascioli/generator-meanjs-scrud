'use strict';

describe('<%= crudNameCap %>s E2E Tests:', function () {
  describe('Test <%= crudName %>s page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/<%= crudName %>s');
      expect(element.all(by.repeater('<%= crudName %> in <%= crudName %>s')).count()).toEqual(0);
    });
  });
});
