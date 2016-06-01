(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers.CreateCtrl', [])
      .controller('CreateCtrl', CreateCtrl);
      
  function CreateCtrl(dataService, $window) {
    console.log('CreateCtrl');
    var self = this;
    
    this.tittle = 'New organization';
    
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
          $window.location.href= "#/";    
      };
         
      dataService.createCompany(newCollection, callback);
            
    };              
   
   
  }
    
})();