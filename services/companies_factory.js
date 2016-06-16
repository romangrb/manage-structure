(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .factory('CompaniesFactory', ['$resource', 'constant', function ($resource, c) {
         
        return $resource(c.DB_API_URL + c.DB_COLLECTION_NAME,
            { apiKey: c.DB_API_KEY}, 
            {
              query:  { method: 'GET', isArray: true },
              create: { method: 'POST' }
            }
          );
          
      }]);
  
})();