(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers', [])
      .controller('CreateCtrl', CreateCtrl);
      
  function CreateCtrl() {
    
    this.tittle = 'Add new company';
    
    this.save = function () {
      //CompaniesFactory.create(collection);
      //$location.path('/user-list');
    };
    
  }
    
})();