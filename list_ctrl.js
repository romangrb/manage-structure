(function(){
  
  'use strict';
  
  angular.
      module('structureMng').
      controller('ListCtrl', ListCtrl);
      
      function ListCtrl($scope, Project) {
        $scope.m = 'message';
        //$scope.companies = Project.query();
        
      }
    
})();