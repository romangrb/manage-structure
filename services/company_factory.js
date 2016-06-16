(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .factory('CompanyFactory', ['$resource', 'constant', function ($resource, c) {
        
        return $resource(c.DB_API_URL + c.DB_COLLECTION_NAME + c.DB_ID_Q,
            { apiKey: c.DB_API_KEY }, 
            {
              show:   { method: 'GET',    params: {id: c.DB_ID_PARAM} },
              update: { method: 'PUT',    params: {id: c.DB_ID_PARAM} },
              remove: { method: 'DELETE', params: {id: c.DB_ID_PARAM} }
            }
          );
      }]);
  
})();