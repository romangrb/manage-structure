(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('TreeCtrl', ['$location', 'dataService', 'constant',
          
  function ($location, dataService, c) {
      
      var self = this;
      
      this.tittle = 'Organization tree';
      
      this.respond = '';
      
      this.query = $location.search() || '';
      
      this.treeFamily = '';
      
      var callback = function(data){
        
        if (!data.status) {
          
          self.treeFamily = data;
          
        } else {
          
          self.respond = c.ERR_SHOW_TREE + data.status;
          
        }
        
      };
      
      (this.query)? 
                   dataService.makeTree(this.query, callback):
                   this.respond = c.ERR_ID_ISSUE + this.query;
                    
    
  }]);
    
})();