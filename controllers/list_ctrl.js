(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('ListCtrl', ['dataService', 'uiIssueService', 'constant',
           
  function (dataService, UIIS, c) {
      
      var self = this;
      
      this.tittle = c.H_LIST;
      
      this.companies = {collections:[]};
      
      this.messageToClient = {info:""};
      
      this.errTittle = c.MSG_ERR_USER;
      
      dataService.getCompanies(
                    UIIS.companyCallback, 
                    {coll : self.companies, 
                     info: self.messageToClient
                    });
  }]);
          
})();