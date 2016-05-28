(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers.ListCtrl', [])
      .controller('ListCtrl', ListCtrl);
      
  function ListCtrl(dataService) {
    
    this.tittle = 'All companies';
    
    //this.companies = CompaniesFactory.query();
    var s = new dataService();
    console.log(s.hello());
    
  }
    
})();