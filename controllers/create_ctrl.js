(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('CreateCtrl', ['dataService', '$window', 'constant',
          
  function(dataService, $window, c) {
    
    var self = this;
    
    this.tittle = c.H_CREATE;
    
    this.potentialParents = "";
    
    this.messageToClient = "";
    
    this.errTittle = c.MSG_ERR_USER;
    
    //dataService.getCompanyPotentialParents(null, true, companyPotentialParentsCallback);
    
    this.save = function(newCollection){
         
      dataService.createCompany(newCollection, createCompanyCallback);
            
    };
    
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
    
    function createCompanyCallback (status, collection){
     console.log(status, collection);
      (!!status.type) ? 
          $window.location.href= "#/" : 
          self.messageToClient = c.MSG_CLIENT_CODE + 
                                 status.code+
                                 c.MSG_CLIENT_MSG+
                                 status.message+
                                 c.MSG_CLIENT_STACK_ERROR+
                                 status.obj.join();
    }
    
  
  }]);
          
})();