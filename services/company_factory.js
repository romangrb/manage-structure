(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .factory('CompanyFactory', function ($resource) {
        
        return $resource('https://api.mongolab.com/api/1/databases' +
            '/grbdb/collections/organizations/:id',
            { apiKey: 'umQLTHlfoM-UB68t6YdiiCzRDByzOUQg' }, 
            {
              show:   { method: 'GET', params: {id: '@id'} },
              update: { method: 'PUT', params: {id: '@id'} },
              remove: { method: 'DELETE', params: {id: '@id'} }
            }
          );
      });
  
})();