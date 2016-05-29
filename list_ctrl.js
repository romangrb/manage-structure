(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers.ListCtrl', [])
      .controller('ListCtrl', ListCtrl);
      
  function ListCtrl(dataService) {
    
    this.tittle = 'All companies';
    console.log(1);
    this.companies = dataService.getCompanies();
    
  }
    
})();