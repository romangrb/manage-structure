(function(){
  
  'use strict';
  
/*This is a module for cloud persistance in mongolab - https://mongolab.com
"https://api.mongolab.com/api/1/databases/YOUR-DATABASE
/collections/YOUR-COLLECTION/" + id + "?apiKey=YOUR-API-KEY")*/

  angular
      .module('structureMng.services', ['ngResource'])
      .factory('CompaniesFactory', function ($resource) {
        
          return $resource('https://api.mongolab.com/api/1/databases/grbdb/collections/organizations', {}, {   
              query: { method: 'GET', isArray: true },
              create: { method: 'POST' }
          });
          
      })
      .factory('UserFactory', function ($resource) {
        
          return $resource('https://api.mongolab.com/api/1/databases/grbdb/collections/organizations:/id', {}, {
              show: { method: 'GET' },
              update: { method: 'PUT', params: {id: '@id'} },
              delete: { method: 'DELETE', params: {id: '@id'} }
          });
          
      });
      
      
      
      /*.factory('Project', function($resource) {
         
          var Project = $resource(
            'https://api.mongolab.com/api/1/databases/grbdb/collections/organizations/:id',
            { apiKey: 'umQLTHlfoM-UB68t6YdiiCzRDByzOUQg' }, 
            { update: { method: 'PUT' } }
          );

          Project.prototype.update = function(cb) {
            return Project.update({id: this._id.$oid},
              angular.extend({}, this, {_id:undefined}), cb);
          };
      
          Project.prototype.destroy = function(cb) {
            return Project.remove({id: this._id.$oid}, cb);
          };
      
          return Project;
      });*/
  
})();