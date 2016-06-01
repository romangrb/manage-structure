(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('TreeCtrl', ['$scope' ,'dataService', 
          
  function ($scope, dataService) {

      this.tittle = 'Organization tree';
      
      this.treeFamily = {
          name : "Parent",
          children: [{
              name : "Child1",
              children: [{
                  name : "Grandchild1",
                  children: []
              },{
                  name : "Grandchild2",
                  children: []
              },{
                  name : "Grandchild3",
                  children: []
              }]
          }, {
              name: "Child2",
              children: []
          }]
        };
    
  }]);
    
})();