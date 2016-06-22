(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('CreateCtrl', ['dataService', 'uiIssueService', 'constant',
          
  function(dataService, UIIS, c) {
    
    var self = this;
    
    this.tittle = c.H_CREATE;
    
    this.potentialParents = {collections:[]};
    
    this.messageToClient  = {info:""};
    
    this.errTittle = c.MSG_ERR_USER;
    
    dataService.getCompanyPotentialParents(
                   null, true, 
                   UIIS.companyCallback, 
                    {coll : self.potentialParents, 
                     info: self.messageToClient
                    });
    
    this.save = function(newCollection){

      dataService.createCompany(newCollection, UIIS.crudCompanyCallback);
            
    };
  
  }]);
          
})();