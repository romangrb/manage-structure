(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('ListCtrl', ListCtrl);
      
      function ListCtrl(Project) {
        
        this.tittle = 'All companies';
        
        this.companies = Project.query();
        
      }
    
})();