(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('EditCtrl', [
                '$location', 
                'dataService', 
                'uiIssueService', 
                'constant',
      
  function EditCtrl($location, dataService, UIIS, c) {
 
    var self = this;
    
    this.editTittle = c.H_EDIT;
    
    this.removeTittle = c.H_REMOVE;
    
    this.unlinkTittle = c.H_UNLINK;
    
    this.potentialParents = {collections:[]};
    
    this.company = {collections:[]};
    
    this.messageToClient = {info:""};
    
    this.responceStatus  = {collections:""};
    
    this.errTittle = c.MSG_ERR_USER;
    
    this.query = $location.search() || null;
    
    dataService.getCompanyPotentialParents(
                    this.query, false, 
                    UIIS.companyCallback, 
                    {coll : self.potentialParents, 
                     info : self.messageToClient
                    });
    
    dataService.getCompany(
                    this.query, 
                    UIIS.companyCallback, 
                    {coll : self.company, 
                     info : self.messageToClient
                    });
    
    this.save = function(newCollection){
         
        dataService.updateCompany(
                      this.query, 
                      newCollection, 
                      UIIS.crudCompanyCallback,
                      {coll : self.company, 
                       info : self.messageToClient
                      });
    };
    
    this.remove = function(){
      
        dataService.removeCompany(
                      this.query, 
                      UIIS.infoCompanyCallback,
                      {coll : self.responceStatus, 
                       info : self.messageToClient
                      });
        
    };
    
    this.unlink = function(){
      
       dataService.unlinkCompany(this.query, 
                      UIIS.infoCompanyCallback,
                      {coll : self.responceStatus, 
                       info : self.messageToClient
                      });
    };
    
    
  }]);
          
})();
    
