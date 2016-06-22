(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .service('dataService', [
            'CompaniesFactory', 
            'CompanyFactory',
            'constant',
            
  function (CompaniesFactory, CompanyFactory, c){
   
    var Company = {
      
      getCompanies : function(callback, link){
          
          var self = this,
            status = {
              type:0,
              code:"",
              message:"",
              obj:[],
            },
          
          successCb = function(collection){
            
            self.__tmp_collection = self.__copyArray(collection);
            
            status.type = 1;
            status.code = c.MSG_STATUS_DB_GET_SUCCESS;
            status.message =  c.MSG_TEXT_DB_GET_SUCCESS ;

            return callback(status, collection, link);
            
          },
          
          errorCb = function(err){
            
            status.type = 0;
            status.code = c.MSG_STATUS_DB_GET_ERROR;
            status.message =  c.MSG_TEXT_DB_GET_ERROR;
            status.obj.push(err);
            
            return callback(status, link);
             
          };
          
          return CompaniesFactory.query(successCb, errorCb);
         
      },
      
      getCompany : function(q, callback, link){
                          
          var self = this,
            status = {
              type:0,
              code:"",
              message:"",
              obj:[],
            },
          
          successCb = function(collection){
            
            self.__tmp_oldParent = collection.parent_id || '';
            
            status.type = 1;
            status.code = c.MSG_STATUS_DB_GET_SUCCESS;
            status.message =  c.MSG_TEXT_DB_GET_SUCCESS ;
            
            return callback(status, collection, link);
            
          },
          
          errorCb = function(err){
            
            status.type = 0;
            status.code = c.MSG_STATUS_DB_GET_ERROR;
            status.message =  c.MSG_TEXT_DB_GET_ERROR;
            status.obj.push(err);
            
            return callback(status, link);
             
          };  
          
          if (q==null) return errorCb(c.ERR_ID_ISSUE);
          
          CompanyFactory.show(q, successCb, errorCb);
          
      },
      
      getCompanyPotentialParents : function(q, isNew, callback, link){
          
          var self = this,
            status = {
              type:0,
              code:"",
              message:"",
              obj:[],
            },
          
          successCb = function(collection){
            
            status.type = 1;
            status.code = c.MSG_STATUS_DB_GET_SUCCESS;
            status.message =  c.MSG_TEXT_DB_GET_SUCCESS ;
            
            return callback(status, collection, link);
            
          },
          
          errorCb = function(err){
            
            status.type = 0;
            status.code = c.MSG_STATUS_DB_GET_ERROR;
            status.message =  c.MSG_TEXT_DB_GET_ERROR;
            status.obj.push(err);
            
            return callback(status, link);
             
          };
          
          (!isNew)? this.__searchPotentialParents(q, successCb, errorCb) : this.getCompanies(callback, link);
          
      },
      
      createCompany : function(collection, callback, link){
          
          var self = this,
            status = {
              type:0,
              code:"",
              message:"",
              obj:[],
            },
          
          successCb = function(cb){
            
            if (cb.parent_id) self.__changeParents(cb, middleSuccessCb, errorCb);
            
            status.type = 1;
            status.code = c.MSG_STATUS_DB_CREATE_SUCCESS;
            status.message =  c.MSG_TEXT_DB_CREATE_SUCCESS;
            
            return callback(status, cb, link);
            
          },
          
          middleSuccessCb = function(statCb){
            
            status.type = 1;
            status.code = c.MSG_STATUS_DB_UPDATE_SUCCESS;
            status.message =  c.MSG_CHANGE_PARENT_SUCCESS;
            status.obj.push(statCb);
            
            return callback(status, statCb, link);
            
          },
          
          errorCb = function(err){
            
            status.type = 0;
            status.code = c.MSG_STATUS_DB_CREATE_ERROR;
            status.message =  c.MSG_TEXT_DB_CREATE_ERROR;
            status.obj.push(err);
            
            return callback(status, link);
            
          };
            
        CompaniesFactory.create(collection, successCb, errorCb);
          
      },
      
      updateCompany : function(q, collection, callback, link){
          
          var self = this,
            status = {
              type:0,
              code:"",
              message:"",
              obj:[],
            },
          
          successCb = function(cb){
            
            status.type = 1;
            status.code = c.MSG_STATUS_DB_UPDATE_SUCCESS;
            status.message =  c.MSG_TEXT_DB_UPDATE_SUCCESS ;
            
            return callback(status, cb, link);
          },
          
          middleSuccessCb = function(statCb){
            
            status.type = 1;
            status.code = c.MSG_STATUS_DB_UPDATE_SUCCESS;
            status.message =  c.MSG_CHANGE_PARENT_SUCCESS;
            status.obj.push(statCb);
            
            CompanyFactory.update(q, collection, successCb, errorCb);
            
          },
          
          errorCb = function(err){
            
            status.type = 0;
            status.code = c.MSG_STATUS_DB_UPDATE_ERROR;
            status.message =  c.MSG_TEXT_DB_UPDATE_ERROR;
            status.obj.push(err);
            
            return callback(status, link);
            
          };
        
        if (q==null) return errorCb(c.ERR_ID_ISSUE);
       
        this.__changeParents(collection, middleSuccessCb, errorCb); 
          
      },
      
      removeCompany : function(q, callback, link){
          
          var self = this,
            status = {
              type:0,
              code:"",
              message:"",
              obj:[],
            },
            
          successCb = function(statCb){
            
            status.type = 1;
            status.code = c.MSG_STATUS_DB_DELETE_SUCCESS;
            status.message =  c.MSG_USER_TEXT_DB_DELETE_SUCCESS;
            status.obj.push(statCb);
            
            return callback(status, link);
          },
          
          middleSuccessCb = function(data){
            
            status.type = 1;
            status.code = c.MSG_STATUS_DB_DELETE_SUCCESS;
            status.message =  c.MSG_TEXT_DB_DELETE_TARG_SUCCESS;
            
            self.__removeFatherFromChildren(data, successCb, errorCb);
            self.__removeChildrenFromFather(data, successCb, errorCb);
            
          },
          
          errorCb = function(err){
            
            status.type = 0;
            status.code = c.MSG_STATUS_DB_UPDATE_ERROR;
            status.message =  c.MSG_TEXT_DB_UPDATE_ERROR;
            status.obj.push(err);
            
            return callback(status, link);
            
          };
            
        if (q==null) return errorCb(c.ERR_ID_ISSUE);
         
        CompanyFactory.remove(q, middleSuccessCb, errorCb);
        
      },
      
      unlinkCompany : function(q, callback, link){
          
          var self = this,
            status = {
              type:0,
              code:"",
              message:"",
              obj:[],
            },
            
          successCb = function(statCb){
            
            status.type = 1;
            status.code = c.MSG_STATUS_DB_DELETE_SUCCESS;
            status.message = c.MSG_USER_TEXT_DB_DELETE_SUCCESS;
            status.obj.push(statCb);
            
            return callback(status, link);
          },
          
          middleSuccessCb = function(data){
            
            status.type = 1;
            status.code = c.MSG_STATUS_DB_DELETE_SUCCESS;
            
            self.__setUnlinked(data, successCb, errorCb);
            self.__removeFatherFromChildren(data, successCb, errorCb);
            self.__removeChildrenFromFather(data, successCb, errorCb);
            
            
          },
          
          errorCb = function(err){
            
            status.type = 0;
            status.code = c.MSG_STATUS_DB_UPDATE_ERROR;
            status.message =  c.MSG_TEXT_DB_UPDATE_ERROR;
            status.obj.push(err);
            
            return callback(status, link);
            
          };
            
        if (q==null) return errorCb(c.ERR_ID_ISSUE);

        CompanyFactory.show(q, middleSuccessCb, errorCb);
        
      },
      
      makeTree : function(q, callback){
        
        var self = this,
        
          cb = function (data){ 
            
            return callback(data[0]);
            
          },
          
          middleCb = function (data){ 
            
            self.__tmp_collection = [];
            self.__getEstimatedEarning(data, cb);
            
          };
        
        self.__getDescendants(q, middleCb);
        
      },
      
    };
       
    function PrivProtMeth (){
      
        var self = this,
        
          descendants = [],
          tmp_descendants = [],
          new_tmp_descendants = [];
        
        this.__tmp_collection = [];
        
        this.__tmp_oldParent = '';
        
        var _slice = Array.prototype.slice;
        
        this.__copyArray = function(args){
          
          return _slice.call(args);
          
        };
        
        this.__getCompanyDescendants = function(company, collection){
            
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
                
                  self.__getCompanyDescendants(new_item, collection);  
              });
          }
                  
        },
          
        this.__getPotentialParents = function(collection, forbiddenCollection){
              
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
            
        },
        
        this.__searchPotentialParents = function(q, successCb, errorCb){
          
          var collection = self.__tmp_collection;
          
          if (collection.length<1) return errorCb(c.MSG_ERR_TMP_GENERATE);
          
          if (q==null) return errorCb(c.ERR_ID_ISSUE);
          
          var thisCompany = collection.find(function(item) {
            return item._id.$oid == q.id;
          });
          
          if (thisCompany) {
              descendants.push(thisCompany);
          }else{
              return errorCb(c.MSG_ERR_TMP_GENERATE);
          }
          
          try {
            this.__getCompanyDescendants(thisCompany, collection);
          }catch (err){
            return errorCb([c.ERR_FIND_DESCENDANT, err]);
          }
          
          try {
            var finalColl = self.__getPotentialParents(collection, descendants);
          }catch (err){
            return errorCb([c.ERR_PFIND_PARENT, err]);
          }
          
          return successCb(finalColl);
          
      };
      
        this.__changeParents = function(company, successCb, errorCb){
         
          var companyId = company._id.$oid,
            newParentId = company.parent_id || "",
            oldParentId = this.__tmp_oldParent,
            childs = "",
            newParent = "",
            oldParent = "",
            changedColl = [],
            
            companies = self.__tmp_collection,
            ln = companies.length;
            
            if (newParentId===oldParentId) {
              return successCb(c.MSG_CHANGE_PARENT_EQUAL);
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
            
            if (newParent){
             
              childs = (newParent.child_ids)? newParent.child_ids: []; 
              childs.push(companyId);
              newParent.child_ids = childs;
              changedColl.push(newParent);
              
            } 
            
            if (oldParent){
             
              childs = oldParent.child_ids; 
              
              childs = childs.forEach(function(item, i, arr){
                if (item === companyId && arr.splice(i, 1)) return;
              });
              changedColl.push(oldParent);
            }
            
            return self.__bindCollection(changedColl, successCb, errorCb);
          
        };
        
        this.__bindCollection = function (collection, successCb, errorCb){
            
            var i = 0,
              status = {
                type:0,
                code:"",
                message:"",
                obj:[],
              },
              
              ln = collection.length,
              tries = 0,
              maxTry = 2,
              
              innerSuccessCb = function(cb) {
                  
                  if (i<ln) {
                    chain(i, collection);
                    ++i;
                    status.type = 1;
                    status.obj.push[cb];
                  }
                    return successCb(status);
              }, 
              
              innerErrorCb = function(err) {
                    
                  ++tries;
                  if (i<1 && tries<maxTry){
                    chain(i, collection);
                  } else if(i<2 && tries<4){
                    chain(i, collection);
                  } else {
                    status.type = 0;
                    status.obj.push[err];
                  }
                  return errorCb(status);
              };
              
              var chain = function(i, coll){
                
                CompanyFactory.update({id:coll[i]._id.$oid}, coll[i], innerSuccessCb, innerErrorCb);
                
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
        
        this.__removeFatherFromChildren = function(collection, successCb, errorCb){
          
            var arr = collection,
              status = {
                type:1, 
                obj:[], 
                message:"",
                ln:0,
                successQuantity : []
              };
            
            if (!arr.child_ids || arr.child_ids.length<1) {
              status.type = 1;
              status.obj.push(c.MSG_TEXT_DB_REM_FATH_FROM_CHILDREN_SUCCESS);
              return successCb(status);
            }
            
            var childrensIds = arr.child_ids,
              ln = childrensIds.length,
              innerSuccessCb = function(data){
                status.successQuantity.push(1);
                ++status.ln;
                if (status.ln>=chLn) {
                  status.message = c.MSG_TEXT_DB_REM_FATH_FROM_CHILDREN_SUCCESS
                  return successCb(status);
                }
              },
              innerErrorCb = function(err){
                status.type = 3;
                status.obj.push(err);
                ++status.ln;
                if (status.ln>=chLn) {
                  status.message = c.MSG_TEXT_DB_REM_FATH_FROM_CHILDREN_SUCCESS
                  return errorCb(status);
                }
              };
            
            var childrens = self.__getChildrens(childrensIds),
              chLn = childrens.length,
              item;
              
            for (var i = 0; i<chLn; i++ ){
              item = childrens[i];
              item.parent_id = '';
              CompanyFactory.update({id:item._id.$oid}, item, innerSuccessCb, innerErrorCb);
            }
             
        };
        
        this.__removeChildrenFromFather = function(collection, successCb, errorCb){
          
            var arr = collection,
              selfId = arr._id.$oid,
              status = {
                type:1, 
                obj:[], 
                message:"",
              };
            
            if (!arr.parent_id) {
              status.type = 1;
              status.obj.push(c.MSG_TEXT_DB_REM_CHILDREN_FROM_FATH_SUCCESS);
              return successCb(status);
            }
            
            var fatherIds = arr.parent_id,
              
              innerSuccessCb = function(data){
                status.type = 1;
                message: c.MSG_TEXT_DB_REM_CHILDREN_FROM_FATH_SUCCESS;
                return successCb(status);
              },
              innerErrorCb = function(err){
                status.type = 0;
                message: c.MSG_TEXT_DB_REM_CHILDREN_FROM_FATH_ERROR;
                status.obj.push(err);
                return errorCb(status);
              };
            
            CompanyFactory.show({id:fatherIds}, function(data){

                var childrensIds = removeFirstMachItem(data.child_ids, selfId);
                  data.child_ids = childrensIds;
                  CompanyFactory.update({id:fatherIds}, data, innerSuccessCb, innerErrorCb);
            });
            
            function removeFirstMachItem(arr, targ){
              
              var ln = arr.length;
              
              for (var i = 0; ln>i; i++ ){
                if (arr[i]===targ && arr.splice(i,1)) return arr;
              }
              return arr;
            }
             
        };
        
        this.__setUnlinked = function(collection, successCb, errorCb){
          
            var item = collection,
              selfId = item._id.$oid,
              status = {
                type:1, 
                obj:[], 
                message:"",
              },
              
              innerSuccessCb = function(data){
                status.type = 1;
                message:c.MSG_TEXT_DB_UPDATE_SUCCESS;
                return successCb(status);
              },
              
              innerErrorCb = function(err){
                status.type = 0;
                status.obj.push(err);
                return errorCb(status);
              };
              
              item.parent_id = '',
              item.child_ids = [];
              
              CompanyFactory.update({id:selfId}, item, innerSuccessCb, innerErrorCb);
              
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
              },
              collection = [];
          
          if (data.status) return callback(status);
          
          makeCollection(data);
              
          collection.reverse();
           
          makeAggrInc(collection, collection);
          
          return callback(data);
          
          function makeCollection(company){
             
            company.forEach(function(item, j, arr) {
              var children = item.children;
                collection.push(item);
              if (children) makeCollection(children);
            });
                
          }
          
          function makeAggrInc(src, targ){
              
              var arr = targ,
                ln = src.length;
              
              for (var i = 0; arr.length>i; i++ ){
                
                for (var j = 0; ln>j; j++ ){
                  
                  if (arr[i].parent_id === src[j]._id.$oid){
                    
                    arr[i].income = arr[i].income || 0;
                    arr[i].total  = arr[i].total || 0;
                    arr[i].total += arr[i].income;
                    
                    src[j].income = src[j].income || 0;
                    src[j].total = src[j].total || 0;
                    
                    src[j].total += arr[i].total;
                    
                    break;
                  }
                  
                }
                
              }
              
              return src;
          }
        
        };
        
    }
      
     PrivProtMeth.prototype = Company;
     
     return new PrivProtMeth();
    
  }]);
    
})();