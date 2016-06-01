(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('ListCtrl', ['$scope', 'dataService',
           
  function ($scope, dataService) {
            
      this.tittle = 'All companies';
      
      this.companies = dataService.getCompanies();
        
  }]);
          
})();