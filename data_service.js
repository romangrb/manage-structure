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
          
          var self = this,
          
          successCb = function(collection){
            
            self.__tmp_collection = self.__copyArray(collection);
            
          };
          
          return CompaniesFactory.query(successCb);
         
      },
      
      getCompany : function(q){
          
          var self = this,
            cb = function (collection){
              self.__tmp_oldParent = collection.parent_id || '';
            };
          
          return CompanyFactory.show(q, cb);
          
      },
      
      getCompanyPotentialParents : function(q, isNew){
         
          return (!isNew)? this.__searchPotentialParents(q) : this.getCompanies();
          
      },
      
      createCompany : function(collection, callback){
          
          var self = this,
            status = {
              type:0, 
              obj:null,
              message:''
            },
            
            successCb = function(cb) {
                
                if (cb.parent_id) self.__changeParents(cb, successCb);
                
                status.type = 1;
                status.message = 'ok';
                return callback(status);
                
            }, 
            errorCb = function(err) {
                status.obj = err;
                return callback(status);
            };
            
        CompaniesFactory.create(collection, successCb, errorCb);
          
      },
      
      updateCompany : function(q, collection, callback){
          
          var self = this,
            status = {
              type:0, 
              obj:null,
              message:''
            },
            
            successCb = function(cb) {
                status.type = 1;
                status.message = 'ok';
                return callback(status);
            }, 
            errorCb = function(err) {
                status.obj = err;
                return callback(status);
            };
            
        CompanyFactory.update(q, collection, successCb, errorCb);
          
      },
      
      setCompanyChanges : function(q, collection){
          
          var self = this,
            
            callback = function (status){ 
              console.log(status, 'setCompanyChanges');
            },
            
            cb = function (status){ 
              
              return (!!status.type) ? 
                              self.updateCompany(q, collection, callback): 
                              status;
            };
          
          this.__changeParents(collection, cb);
          
      }
      
    };
       
    function PrivProtMeth (){
      
        var self = this;
        
        this.__tmp_collection = '';
        
        this.__tmp_oldParent = '';
        
        var _slice = Array.prototype.slice;
        
        this.__copyArray = function(args){
          
          return _slice.call(args);
          
        };
        
        this.__searchPotentialParents = function(q){
          
          var collection = self.__tmp_collection;
          
          if (collection == null || collection.length<1) return '';
          
          var thisCompany = collection.find(function(item) {
            return item._id.$oid == q.id;
          });
          
          var descendants = [],
            tmp_descendants = [],
            new_tmp_descendants = [];
            
          descendants.push(thisCompany);
            
          getDescendants(thisCompany);
          
          return getPotentialParents(collection, descendants);
          
          function getDescendants(company){
            
              if (!company || company.child_ids==null || company.child_ids.length<0) return;
                  
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
          
          function getPotentialParents (collection, forbiddenCollection){

            var arr = forbiddenCollection,
              ln = collection.length,
              potentialParents = [].concat(collection);
            
            for (var i = 0; arr.length>i; i++ ){
                for (var j = 0; ln>j; j++ ){
                  if (arr[i]._id.$oid === collection[j]._id.$oid){
                      potentialParents[j] = null;
                      break;
                  }
                }
            }
            
            potentialParents = potentialParents.filter(function(item) {
                return item != null;
            });
            
            return potentialParents;
            
          }
          
      };
      
        this.__changeParents = function(company, callback){
         
          var companyId = company._id.$oid,
            newParentId = company.parent_id || "",
            oldParentId = this.__tmp_oldParent,
            newParent = '',
            oldParent = '',
            changedColl = [],
            status = {type:1, obj:null},
            
            companies = self.__tmp_collection,
            ln = companies.length;
            
            if (newParentId===oldParentId) {
              return callback(status);
            }
            
            if (newParentId && oldParentId){
                
                for (var i = 0; ln>i; i++ ){
                  
                  if (companies[i]._id.$oid === newParentId) {
                    newParent = companies[i];
                  }
                  
                  if (companies[i]._id.$oid === oldParentId) {
                    oldParent = companies[i];
                  }
                 
                  if (newParent && oldParent) break;
                  
                }
              
            } else if (oldParentId){
               
                for (var i = 0; ln>i; i++ ){
                
                  if (companies[i]._id.$oid === oldParentId) {
                    oldParent = companies[i];
                    break;
                  }
                 
                }
              
            } else {
              
              for (var i = 0; ln>i; i++ ){
                
                  if (companies[i]._id.$oid === newParentId) {
                    newParent = companies[i];
                    break;
                  }
                 
                }
              
            }
            
            var childs = '';
            
            if (newParent){
             
              childs = (newParent.child_ids)? newParent.child_ids: []; 
              childs.push(companyId);
              newParent.child_ids = childs;
              changedColl.push(newParent);
              // {id:newParentId}, newParent
            } 
            
            if (oldParent){
             
              childs = oldParent.child_ids; 
              
              childs = childs.forEach(function(item, i, arr){
                if (item === companyId && arr.splice(i, 1)) return;
              });
              changedColl.push(oldParent);
            }
            
            return self.__bindCollection(changedColl, callback);
          
        };
        
        this.__bindCollection = function (collection, callback){
            
            var i = 0,
              status = {type:0, obj:null},
              ln = collection.length,
              tries = 0,
              maxTry = 2,
              
              successCb = function(cb) {
                  
                  if (i<ln) {
                    //console.log(i, collection[i]);
                    chain(i, collection);
                    ++i;
                    status.type = 1;
                    status.obj = cb;
                  }
                    return callback(status);
              }, 
              errorCb = function(err) {
                    
                  ++tries;
                  if (i<1 && tries<maxTry){
                    chain(i, collection);
                  } else if(i<2 && tries<4){
                    chain(i, collection);
                  } else {
                    status.type = 0;
                    status.obj = err;
                  }
                  return callback(status);
              };
              
              var chain = function(i, coll){
                
                CompanyFactory.update({id:coll[i]._id.$oid}, coll[i], successCb, errorCb);
                
              };
              
              chain(i, collection);
              
        };
        
  
    }
      
     PrivProtMeth.prototype = Company;
     
     return new PrivProtMeth();
    
  }]);
    
})();