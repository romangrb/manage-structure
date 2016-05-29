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
        //if (arr!=null&&arr.length>0)  
        var thisCompany = collection.find(function(item) {
          return item._id.$oid == q.id;
        });
        
        var descendants = [];
        
        getDescendants(thisCompany);
        
        function getDescendants(company){
                
            if (company.child_ids!=null && company.child_ids.length>0) {
                
                var companies = company.child_ids;  
                    
                collection.forEach(function(item, j, arr) {
                  
                    companies.forEach(function(targChild, i, targArr) {
                    
                        if (targChild == item._id.$oid) {
                            
                            descendants.push(item);
                            arr.splice(j, 1);
                          
                        }
                    
                    });
                    
                });
            }
            getDescendants(descendants);
            
        }
        
        console.log(descendants, collection); 
        //}
        
        //CompanyFactory(successCb);
        
        function successCb(collections){
         
         /* var potentialParents = [],
            arr = collections,
            ln = arr.length;
            
          for (var i = 0; i < ln; i++) {
            
            var childrens = arr[i].child_ids;
            
            if (childrens!=null&&childrens.length>0){  
              
                arr.forEach(function(item, i, arr) {
                    
                    if (item===self.original._id.$oid) {
                      arr.child_ids.splice(i, 1);
                    }
                
                });
         
            }    
              
              
              console.log(potentialParents);
              
            }*/
          
        }
        
      };
  
    }
      
     PrivProtMeth.prototype = Company;
     
     return new PrivProtMeth();
    
  }]);
    
})();