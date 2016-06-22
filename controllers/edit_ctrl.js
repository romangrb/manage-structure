(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('EditCtrl', ['$location', 'dataService', 'uiIssueService', 'constant',
      
  function EditCtrl($location, dataService, UIIS, c) {
 
    var self = this;
    
    this.editTittle = c.H_EDIT;
    
    this.removeTittle = c.H_REMOVE;
    
    this.unlinkTittle = c.H_UNLINK;
    
    this.potentialParents = "";
    
    this.company = "",
    
    this.messageToClient = "";
    
    this.responceStatus = "";
    
    this.errTittle = c.MSG_ERR_USER;
    
    this.query = $location.search() || null;
    
    dataService.getCompanyPotentialParents(this.query, false, companyPotentialParentsCallback);
    
    dataService.getCompany(this.query, companyCallback);
    
    this.save = function(newCollection){
         
        dataService.updateCompany(this.query, newCollection, updateCompanyCallback);
        
    };
    
    this.remove = function(){
      
        dataService.removeCompany(this.query, removeCompanyCallback);
        
    };
    
    this.unlink = function(q){
       dataService.unlinkCompany(this.query, unlinkCompanyCallback);
    };
    
    function companyCallback (status, collection){
    
      (!!status.type) ? 
          self.company = collection : 
          self.messageToClient = c.MSG_CLIENT_CODE + 
                                 status.code+
                                 c.MSG_CLIENT_MSG+
                                 status.message+
                                 c.MSG_CLIENT_STACK_ERROR+
                                 status.obj.join();
    }
                    
    function companyPotentialParentsCallback (status, collection){
    
      (!!status.type) ? 
          self.potentialParents = collection : 
          self.messageToClient = c.MSG_CLIENT_CODE + 
                                 status.code+
                                 c.MSG_CLIENT_MSG+
                                 status.message+
                                 c.MSG_CLIENT_STACK_ERROR+
                                 status.obj.join();
    }
    
    function updateCompanyCallback (status, collection){
   
      (!!status.type) ? 
          $window.location.href= "#/" : 
          self.messageToClient = c.MSG_CLIENT_CODE + 
                                 status.code+
                                 c.MSG_CLIENT_MSG+
                                 status.message+
                                 c.MSG_CLIENT_STACK_ERROR+
                                 status.obj.join();
    }
    
    function removeCompanyCallback (status, collection){
    
      (!!status.type) ? 
          self.responceStatus =  status.message : 
          self.messageToClient = c.MSG_CLIENT_CODE + 
                                 status.code+
                                 c.MSG_CLIENT_MSG+
                                 status.message+
                                 c.MSG_CLIENT_STACK_ERROR+
                                 status.obj.join();
    }
    
    function unlinkCompanyCallback (status, collection){
    console.log(status);
      (!!status.type) ? 
          self.responceStatus =  status.message : 
          self.messageToClient = c.MSG_CLIENT_CODE + 
                                 status.code+
                                 c.MSG_CLIENT_MSG+
                                 status.message+
                                 c.MSG_CLIENT_STACK_ERROR+
                                 status.obj.join();
    }
    
    
  }]);
          
})();
    
