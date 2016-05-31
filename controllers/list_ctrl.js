(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers.ListCtrl', [])
      .controller('ListCtrl', ListCtrl);
      
  function ListCtrl(dataService) {
    
    this.tittle = 'All companies';
    
    this.companies = dataService.getCompanies();
    
  }
    
})();