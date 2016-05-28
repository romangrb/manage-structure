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
        CompanyFactory.remove(q, function(cb){
            console.log(cb);   
        });
       
    };
    
  }
    
})();