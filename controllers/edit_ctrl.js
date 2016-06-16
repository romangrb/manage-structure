(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('EditCtrl', ['$location', '$window', 'dataService', 'constant',
      
  function EditCtrl($location, $window, dataService, c) {
 
    var self = this;

    this.editTittle = c.H_EDIT;
    
    this.removeTittle = c.H_REMOVE;
    
    this.unlinkTittle = c.H_UNLINK;
    
    this.potentialParents = "";
    
    this.messageToClient = "";
    
    this.errTittle = c.MSG_ERR_USER;
    
    this.query = $location.search() || '';
    
    dataService.getCompanyPotentialParents(this.query, false, companyPotentialParentsCallback);
    
    /*this.save = function(newCollection){
         
      dataService.createCompany(newCollection, createCompanyCallback);
            
    };*/
    
    function companyPotentialParentsCallback (status, collection){
    console.log(status);
      (!!status.type) ? 
          self.potentialParents = collection : 
          self.messageToClient = c.MSG_CLIENT_CODE + 
                                 status.code+
                                 c.MSG_CLIENT_MSG+
                                 status.message+
                                 c.MSG_CLIENT_STACK_ERROR+
                                 status.obj.join();
    }
    
    function createCompanyCallback (status, collection){
     
      (!!status.type) ? 
          $window.location.href= "#/" : 
          self.messageToClient = c.MSG_CLIENT_CODE + 
                                 status.code+
                                 c.MSG_CLIENT_MSG+
                                 status.message+
                                 c.MSG_CLIENT_STACK_ERROR+
                                 status.obj.join();
    }
    
    this.company = (this.query)? 
                    dataService.getCompany(this.query):
                    '';
                        
    this.save = function(newCollection){
      
      var status = {
        type:0, 
        obj:{
          message:c.ERR_ID_ISSUE}
      },
        callback = function (status){ 
          console.log(status);
          $window.location.href= "#/";    
      };
         
      (this.query)? 
                  dataService.setCompanyChanges(this.query, newCollection, callback):
                  status;
    };
    
    this.remove = function(q){
      
      var status = {
        type:0, 
        obj:{
          message:""
        }
      },
        callback = function (status){ 
          console.log(status);
          $window.location.href= "#/";    
      };
         
      (this.query)? 
                  dataService.removeCompany(this.query, callback):
                  status;
    };
    
    this.unlink = function(q){
      
      var status = {
        type:0, 
        obj:{
          message:""
        }
      },
        callback = function (status){ 
          console.log(status);
          $window.location.href= "#/";    
      };
         
      (this.query)? 
                  dataService.unlinkCompany(this.query, callback):
                  status;
    };
    
  }]);
          
})();
    
