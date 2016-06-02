(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('ListCtrl', ['dataService', 'constant',
           
  function (dataService, c) {
            
      this.tittle = c.H_LIST;
      
      this.companies = dataService.getCompanies();
        
  }]);
          
})();