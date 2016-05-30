(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers.CreateCtrl', [])
      .controller('CreateCtrl', CreateCtrl);
      
  function CreateCtrl(dataService) {
    
    var self = this;
    
    this.tittle = 'Add new company';
    
    this.responceStatus = '';
    
    this.potentialParents = dataService.getCompanyPotentialParents(null, true) || '';
    
    this.save = function(newCollection){
      
      var status = {
        type:0, 
        obj:{
          message:"Company indentification issue \n plese try again"}
      },
        callback = function (status){ 
          console.log(status);   
      };
         
      dataService.createCompany(newCollection, callback);
                  
    };                                        
    
  }
    
})();