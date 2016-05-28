(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers.ListCtrl', [])
      .controller('ListCtrl', ListCtrl);
      
  function ListCtrl(CompaniesFactory) {
    
    this.tittle = 'All companies';
    
    this.companies = CompaniesFactory.query();
    
  }
    
})();