(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('TreeCtrl', ['$scope', '$location', 'dataService', 
          
  function ($scope, $location, dataService) {

      this.tittle = 'Organization tree';
      
      this.query = $location.search() || '';
      
      var callback = function(data){
        if (!data.status) console.log(data);
      };
      
      //(this.query)? dataService.makeTree(this.query, callback): {};
                    
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