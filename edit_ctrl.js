(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers.EditCtrl', [])
      .controller('EditCtrl', EditCtrl);
      
  function EditCtrl(CompanyFactory, $location) {
    
    this.editTittle = 'Edit company';
    
    this.removeTittle = 'Remove company';
    
    this.remove = function(){
        
      var q = $location.search();
        console.log(q.id);
        /*CompanyFactory.remove(q.id);   */
    };
    
  }
    
})();