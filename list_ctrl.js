(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers', [])
      .controller('ListCtrl', ListCtrl);
      
  function ListCtrl(CompaniesFactory) {
    
    this.tittle = 'All companies';
    
    this.companies = CompaniesFactory.query();
    console.log(this.companies, 2);
  }
    
})();