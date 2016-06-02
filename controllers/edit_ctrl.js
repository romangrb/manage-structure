(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('EditCtrl', ['$location', '$window', 'dataService', 'constant',
      
  function EditCtrl($location, $window, dataService, c) {
 
    var self = this;

    this.editTittle = c.H_EDIT;
    this.removeTittle = c.H_REMOVE;
    this.unlinkTittle = c.H_UNLINK;
    this.responceStatus = '';
    this.query = $location.search() || '';
    
    this.potentialParents = (this.query)? 
                                        dataService.getCompanyPotentialParents(this.query):
                                        ''; 
    this.company = (this.query)? 
                    dataService.getCompany(this.query):
                    '';
                        
    this.save = function(newCollection){
      
      var status = {
        type:0, 
        obj:{
          message:c.ERR_ID_ISSUE}
      },
        callback = function (status){ 
          console.log(status);
          $window.location.href= "#/";    
      };
         
      (this.query)? 
                  dataService.setCompanyChanges(this.query, newCollection, callback):
                  status;
    };
    
    this.remove = function(q){
      
      var status = {
        type:0, 
        obj:{
          message:""
        }
      },
        callback = function (status){ 
          console.log(status);
          $window.location.href= "#/";    
      };
         
      (this.query)? 
                  dataService.removeCompany(this.query, callback):
                  status;
    };
    
    this.unlink = function(q){
      
      var status = {
        type:0, 
        obj:{
          message:""
        }
      },
        callback = function (status){ 
          console.log(status);
          $window.location.href= "#/";    
      };
         
      (this.query)? 
                  dataService.unlinkCompany(this.query, callback):
                  status;
    };
    
  }]);
          
})();
    
