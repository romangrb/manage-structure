(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .service('dataService', [
            'CompaniesFactory', 
            'CompanyFactory', 
            
  function (CompaniesFactory, CompanyFactory){
   
    var Company = {  
        
      constructor : function fn(){
          this.__isConfig = false;
      },
      
      getCompanies : function(callback){
          
          var self = this,
          
          successCb = function(collection){
            
            self.__tmp_collection = self.__copyArray(collection);
            
            if (callback) return callback(collection);
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
      
      setCompanyChanges : function(q, collection, callback){
          
          var self = this,
            
            middleCb = function (status){ 
              return callback(status, 'setCompanyChanges');
            },
            
            cb = function (status){ 
              
              return (!!status.type) ? 
                              self.updateCompany(q, collection, middleCb): 
                              status;
            };
          
          this.__changeParents(collection, cb);
          
      },
      
      removeCompany : function(q, callback){
        
          var self = this,
            
            cb = function (data){ 
                self.__removeFatherFromChildren(data, callback);
                self.__removeChildrenFromFather(data, callback);
            };
         
        CompanyFactory.remove(q, cb);
        
      },
      
      unlinkCompany : function(q, callback){
        
          var self = this,
            
            cb = function (data){ 
              
              self.__removeFatherFromChildren(data, callback);
              self.__removeChildrenFromFather(data, callback);
              self.__setUnlinked(data, callback);
              
            };
         
        CompanyFactory.show(q, cb);
        
      },
      
      makeTree : function(q, callback){
        
        var self = this,
          
          cb = function (data){ 
            
            self.__tmp_collection = [];
            return callback(data);
            
          };
        
        self.__getDescendants(q, cb);
        
      },
      
      
    };
       
    function PrivProtMeth (){
      
        var self = this;
        
        this.__tmp_collection = [];
        
        this.__tmp_oldParent = '';
        
        var _slice = Array.prototype.slice;
        
        this.__copyArray = function(args){
          
          return _slice.call(args);
          
        };
        
        this.__searchPotentialParents = function(q){
          
          var collection = self.__tmp_collection;
          
          if (collection.length<1) return '';
          
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
            
              if (!company || company.child_ids==null || company.child_ids.length<1) return;
                  
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
        
        this.__getChildrens = function (collectionIds){
          
          var self = this,
            collection = self.__tmp_collection,
            collLn = collection.length,
            arr = collectionIds,
            ln = arr.length,
            children = [];
        
          if (ln<1) return [];
          
            for (var i = 0; arr.length>i; i++ ){
                
              for (var j = 0; collLn>j; j++ ){
                  if (collection[j]._id.$oid === arr[i]){
                      children.push(collection[j]);
                      break;
                  }
                }
                
                if (children.length>=ln) break;
                
            } 
            
            return children;
          
          
        };
        
        this.__removeFatherFromChildren = function(collection, callback){
          
            var arr = collection,
              status = {
                type:1, 
                obj:[], 
                message:'done',
                ln:0,
                successQuantity : []
              };
            
            if (!arr.child_ids || arr.child_ids.length<1) return callback(status);
            
            var childrensIds = arr.child_ids,
              ln = childrensIds.length,
              cb = function(data){
                status.successQuantity.push(1);
                ++status.ln;
                if (status.ln>=chLn) return callback(status);
              },
              errorCb = function(err){
                status.type = 3;
                status.obj.push(err);
                ++status.ln;
                if (status.ln>=chLn) return callback(status);
              };
            
            var childrens = self.__getChildrens(childrensIds),
              chLn = childrens.length,
              item;
              
            for (var i = 0; i<chLn; i++ ){
              item = childrens[i];
              item.parent_id = '';
              CompanyFactory.update({id:item._id.$oid}, item, cb, errorCb);
            }
             
        };
        
        this.__removeChildrenFromFather = function(collection, callback){
          
            var arr = collection,
              selfId = arr._id.$oid,
              status = {
                type:1, 
                obj:[], 
                message:'done',
              };
            
            if (!arr.parent_id) return callback(status);
            
            var fatherIds = arr.parent_id,
              
              cb = function(data){
                status.type = 1;
                message:'removed from parent';
                return callback(status);
              },
              errorCb = function(err){
                status.type = 0;
                status.obj.push(err);
                return callback(status);
              };
            
            CompanyFactory.show({id:fatherIds}, function(data){
                
                var childrensIds = removeFirstMachItem(data.child_ids, selfId);
                  data.child_ids = childrensIds;
                  CompanyFactory.update({id:fatherIds},data, cb, errorCb);
            });
            
            function removeFirstMachItem(arr, targ){
              
              var ln = arr.length;
              
              for (var i = 0; ln>i; i++ ){
                if (arr[i]===targ && arr.splice(i,1)) return arr;
              }
              return arr;
            }
             
        };
        
        this.__setUnlinked = function(collection, callback){
          
            var item = collection,
              selfId = item._id.$oid,
              status = {
                type:1, 
                obj:[], 
                message:'done',
              },
              
              cb = function(data){
                status.type = 1;
                message:'unlinked';
                return callback(status);
              },
              errorCb = function(err){
                status.type = 0;
                status.obj.push(err);
                return callback(status);
              };
              
              item.parent_id = '',
              item.child_ids = [];
              
              CompanyFactory.update({id:selfId}, item, cb, errorCb);
              
        };
        
        this.__getDescendants = function(q, callback){
          
          var self = this,
              status = {
                type:0, 
                obj:[], 
                message:'done',
              };
          
          (self.__tmp_collection.length<1)?
                                         self.getCompanies(successCb, errorCb):
                                         successCb(self.__tmp_collection);
          function errorCb(err){
             return callback(status.obj.push(err));
          }
                                                
          function successCb(collection){
              
              var thisCompany = collection.find(function(item) {
                return item._id.$oid == q.id;
              });
          
              var descendants = [],
                tmp_descendants = [],
                new_tmp_descendants = [];
                
              descendants.push(thisCompany);
               
              getDescendants(thisCompany);
              
              return callback(descendants);
              
              function getDescendants(company){
                
                  if (!company || company.child_ids==null || company.child_ids.length<1) return;
                      
                  var companies = company.child_ids;
                   company.children = [];
                   
                  collection.forEach(function(item, j, arr) {
                     
                      companies.forEach(function(targChild, i, targArr) {
                          if (targChild == item._id.$oid) {
                            company.children.push(item);
                            tmp_descendants.push(item);
                          }
                      });
                      
                  });
                  
                  if (tmp_descendants.length>0){
                      
                      new_tmp_descendants = self.__copyArray(tmp_descendants);
                      
                      tmp_descendants = [];
                      
                      new_tmp_descendants.forEach(function(new_item) {
                        
                          getDescendants(new_item); 
                          
                      });
                  }
                      
              }
              
          }

        };
        
        this.__getEstimatedEarning = function(data, callback){
          
          var self = this,
              status = {
                type:0, 
                obj:[], 
                message:'done',
              };
          
          if (data.status) return callback(status);
  
          var descendants = [],
            tmp_descendants = [],
            new_tmp_descendants = [];
            
          
          /*return callback(descendants);
          
          function getDescendants(company){
            
              if (!company || company.child_ids==null || company.child_ids.length<1) return;
                  
              var companies = company.child_ids;
               company.children = [];
               
              collection.forEach(function(item, j, arr) {
                 
                  companies.forEach(function(targChild, i, targArr) {
                      if (targChild == item._id.$oid) {
                        company.children.push(item);
                        tmp_descendants.push(item);
                      }
                  });
                  
              });
              
              if (tmp_descendants.length>0){
                  
                  new_tmp_descendants = self.__copyArray(tmp_descendants);
                  
                  tmp_descendants = [];
                  
                  new_tmp_descendants.forEach(function(new_item) {
                    
                      getDescendants(new_item); 
                      
                  });
              }
                  
          }*/
              
          

        };
        
    }
      
     PrivProtMeth.prototype = Company;
     
     return new PrivProtMeth();
    
  }]);
    
})();