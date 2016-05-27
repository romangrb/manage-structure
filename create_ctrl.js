(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('CreateCtrl', CreateCtrl);
      
      function CreateCtrl(Project) {
        
        this.tittle = 'Add new company';
        
      }

    
})();