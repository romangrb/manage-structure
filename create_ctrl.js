(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers.CreateCtrl', [])
      .controller('CreateCtrl', CreateCtrl);
      
  function CreateCtrl(CompaniesFactory) {
    
    this.tittle = 'Add new company';
    
    this.save = function (company) {
      CompaniesFactory.create(company);
      //$location.path('/user-list');
    };
    
  }
    
})();