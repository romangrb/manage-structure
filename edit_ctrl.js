(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers.EditCtrl', [])
      .controller('EditCtrl', EditCtrl);
      
  function EditCtrl($scope, $location, dataService) {
    
    var self = this;
    
    this.editTittle = 'Edit company';
    this.removeTittle = 'Remove company';
    this.responceStatus = '';
    this.query = $location.search() || '';
    
    this.potentialParents = (this.query)? 
                                        dataService.getCompanyPotentialParents(this.query):
                                        ''; 
    this.company = {};
    
    this.company = (this.query)? 
                    dataService.getCompany(this.query, successCb):
                    '';
                    
    var successCb = function(collection){
        this.company = collection;   
    };
                  
    this.save = function(){
      
        (self.query)?
                     dataService.getCompanyPotentialParents(self.query):
                     console.log('n');
    };
    
  }
    
})();