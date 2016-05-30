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
    
    this.oldParentId = this.company.parent_id;
                 
    this.save = function(newCollection){
        var tmp_changeData = {
          data : newCollection,
          oldId : self.oldParentId,
          
        };
        
        dataService.setCompanyChanges(self.query, tmp_changeData, successCb);
       
    };
    
    var successCb = function(collection){
        this.company = collection;
    };
    
  }
    
})();