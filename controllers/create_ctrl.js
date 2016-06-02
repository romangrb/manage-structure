(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('CreateCtrl', ['dataService', '$window', 'constant',
          
  function(dataService, $window, c) {
    
    var self = this;
    
    this.tittle = c.H_CREATE;
    
    this.responceStatus = '';
    
    this.potentialParents = dataService.getCompanyPotentialParents(null, true) || '';
    
    this.save = function(newCollection){
      
      var status = {
        type:0, 
        obj:{
          message:c.ERR_ID_ISSUE
        }
      },
        callback = function (status){ 
          $window.location.href= "#/";    
      };
         
      dataService.createCompany(newCollection, callback);
            
    };
  
  }]);
          
})();