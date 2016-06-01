(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .factory('CompaniesFactory', function ($resource) {
         
        return $resource('https://api.mongolab.com/api/1/databases' +
            '/grbdb/collections/organizations',
            { apiKey: 'umQLTHlfoM-UB68t6YdiiCzRDByzOUQg' }, 
            {
              query:  { method: 'GET', isArray: true },
              create: { method: 'POST' }
            }
          );
          
      });
  
})();