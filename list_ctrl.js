(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers', [])
      .controller('ListCtrl', ListCtrl);
      
  function ListCtrl(CompaniesFactory) {
    
    this.tittle = 'All companies';
    
  }
    
})();