(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers.EditCtrl', [])
      .controller('EditCtrl', EditCtrl);
      
  function EditCtrl(dataService, $location) {
    
    var self = this;
    
    this.editTittle = 'Edit company';
    this.removeTittle = 'Remove company';
    this.responceStatus = '';
    this.query = $location.search() || '';
    
    this.potentialParents = (this.query)? 
                                        dataService.getCompanyPotentialParents(this.query):
                                        '';  
    this.save = function(){
      
        (self.query)?
                     dataService.getCompanyPotentialParents(self.query):
                     console.log('n');
    };
    
    this.remove = function(){
      
      var q = self.query;
      q.id = q.id+2;
      
    };
    
  }
    
})();