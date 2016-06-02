(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .controller('EditCtrl', ['$scope', '$location', '$window', 'dataService',
      
  function EditCtrl($scope, $location, $window, dataService) {
    
    var self = this;

    this.editTittle = 'Edit company';
    this.removeTittle = 'Remove company';
    this.unlinkTittle = 'Unlink company';
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
          message:"Company indentification issue \n plese try again"}
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
    