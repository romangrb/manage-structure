(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('ListCtrl', ['dataService', 'constant',
           
  function (dataService, c) {
      
      var self = this;
      
      this.tittle = c.H_LIST;
      
      this.companies = "";
      
      this.messageToClient = "";
      
      this.errTittle = c.MSG_ERR_USER;
      
      dataService.getCompanies(callback);
      
      function callback (status, collection){
        
        (!!status.type) ? 
            self.companies = collection : 
            self.messageToClient = c.MSG_CLIENT_CODE + 
                                   status.code+
                                   c.MSG_CLIENT_MSG+
                                   status.message+
                                   c.MSG_CLIENT_STACK_ERROR+
                                   status.obj.join();
      }
      
  }]);
          
})();