(function(){
  
  'use strict';
  
  angular
      .module('structureMng.services.dataService', [])
      .service('dataService', [
            'CompaniesFactory', 
            'CompanyFactory', 
            
  function (CompaniesFactory, CompanyFactory){
     
    var Company = {  
        
      constructor : function fn(){
        this._isConfig = false;
      },
        
      hello : function(){
        return this._DEFLT_MAX_INTRV_LN;
      }
      
    };
       
    function PrivProtMeth (){
      
      this._DEFLT_MAX_INTRV_LN = 4;
  
    }
      
     PrivProtMeth.prototype = Company;
     
     return PrivProtMeth;
    
  }]);
    
})();