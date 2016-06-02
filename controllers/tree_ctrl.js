(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('TreeCtrl', ['$scope', '$location', 'dataService', 
          
  function ($scope, $location, dataService) {
      
      var self = this;
      
      this.tittle = 'Organization tree';
      
      this.respond = '';
      
      this.query = $location.search() || '';
      
      this.treeFamily = '';
      
      var callback = function(data){
        
        if (!data.status) {
          
          self.treeFamily = data;
          
        } else {
          
          self.respond = "Cannot create tree for structure," 
          +"please show this message to youre administrator : ERROR"
          +data.status;
          
        }
        
      };
      
      (this.query)? dataService.makeTree(this.query, callback): {};
                    
    
  }]);
    
})();