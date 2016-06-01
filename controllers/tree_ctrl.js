(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers.treeCtrl', [])
      .controller('TreeCtrl', TreeCtrl);
      
  function TreeCtrl(dataService) {
    console.log('TreeCtrl');
      this.tittle = 'Organization tree';
      
      /*this.treeFamily = {
          name : "ent",
          children_ids: [{
              name : "Child1",
              earn : 28,
              total:'59',
              children_ids: [{
                  name : "Grandchild1",
                  children_ids: []
              },{
                  name : "Grandchild2",
                  earn : 28,
                  children_ids: [{
                      name : "Grandchild211",
                      children_ids: []
                  }]
              },{
                  name : "Grandchild3",
                  children_ids: []
              }]
          }, {
              name: "Child2",
              children_ids: []
          }]
      };*/
    
  }
    
})();