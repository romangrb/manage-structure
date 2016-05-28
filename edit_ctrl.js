(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers.EditCtrl', [])
      .controller('EditCtrl', EditCtrl);
      
  function EditCtrl(CompanyFactory, $location) {
    
    var self = this;
    
    this.editTittle = 'Edit company';
    
    this.removeTittle = 'Remove company';
    
    this.query = $location.search() || '';
    
    this.responceStatus = ''; 
    
    this.remove = function(){
      
      var q = self.query;
      q.id = q.id+2;
      
      var success = function(cb){
            console.log(cb);   
      };
        
      var error = function(err){
          console.log(err);   
      };
      
      CompanyFactory.show(q, success, error); 
      
    };
    
  }
    
})();