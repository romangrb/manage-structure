(function(){
  
  'use strict';
  
  angular
      .module('structureMng.services.dataService', [])
      .service('dataService', [
            'CompaniesFactory', 
            'CompanyFactory', 
            
  function (CompaniesFactory, CompanyFactory){
     
    var Company = {  
        
      constructor : function fn(){
          this.__isConfig = false;
      },
      
      getCompanies : function(){
          
          var self = this;
          
          var successCb = function(collection){
            
            self.__tmp_collection = self.__copyArray(collection);
            
          };
          
          return CompaniesFactory.query(successCb);
         
      },
      
     /* unlinkCompany : function(q){
        
        console.log(q);
        
      },*/
      
      getCompanyPotentialParents : function(q){
         
          this.__searchPotentialParents(q);
          
      }
      
    };
       
    function PrivProtMeth (){
      
        var self = this;
        
        this.__tmp_collection = '';
        
        var _slice = Array.prototype.slice;
        
        this.__copyArray = function(args){
          
          return _slice.call(args);
          
        };
      
        this.__searchPotentialParents = function(q){
          
          var collection = self.__tmp_collection;
          
          if (collection==null || collection.length<1) return '';
          
          var thisCompany = collection.find(function(item) {
            return item._id.$oid == q.id;
          });
          
          var descendants = [],
            tmp_descendants = [],
            new_tmp_descendants = [];
            
          getDescendants(thisCompany);
          
          getPotentialParents(collection, descendants);
          
          function getDescendants(company){
                  
              if (company.child_ids!=null && company.child_ids.length>0) {
                  
                  var companies = company.child_ids;  
                      
                  collection.forEach(function(item, j, arr) {
                    
                      companies.forEach(function(targChild, i, targArr) {
                          if (targChild == item._id.$oid) tmp_descendants.push(item);
                      });
                      
                  });
                  
                  if (tmp_descendants.length>0){
                    
                      descendants = descendants.concat(tmp_descendants);
                      
                      new_tmp_descendants = self.__copyArray(tmp_descendants);
                      
                      tmp_descendants = [];
                      
                      new_tmp_descendants.forEach(function(new_item) {
                          getDescendants(new_item);  
                      });
                 
                  }
                  
              }
                  
          }
          
          function getPotentialParents (collection, forbiddenCollection){
            
            var arr = forbiddenCollection,
             potentialParents = collection.find(function(item) {
              
              if (arr.some(function(index){
                  return item._id.$oid !== index._id.$oid;
              })) return item;
                
            });
            console.log(potentialParents,'p');
          }
          
      };
  
    }
      
     PrivProtMeth.prototype = Company;
     
     return new PrivProtMeth();
    
  }]);
    
})();