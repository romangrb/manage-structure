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
    this.company = (this.query)? 
                    dataService.getCompany(this.query, successCb):
                    '';
                  
    this.save = function(newCollection){
      
        dataService.setCompanyChanges(self.query, newCollection, successCb);
       
    };
    
    var successCb = function(collection){
        this.company = collection; 
    };
    
  }
    
})();