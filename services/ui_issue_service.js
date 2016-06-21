(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .service('uiIssueService', [
            'constant',
            
  function (c){
   
    var Message = {
      
      getMessage : function(callback){
          
      },
      
    };
       
    function PrivProtMeth (){
      
        var self = this;
        
        this.__get = function(company, collection){
            
          
                  
        }
          
        
    }
      
     PrivProtMeth.prototype = Message;
     
     return new PrivProtMeth();
    
  }]);
    
})();