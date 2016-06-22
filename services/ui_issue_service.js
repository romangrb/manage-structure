(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .service('uiIssueService', [
            '$window',
            'constant', 
            
  function ($window, c){
   
    var Message = {
      
      companyCallback : function (status, collection, link){
        (!!status.type) ? 
          link.coll.collections = collection :
          link.info = this.__getStandartMsgErr(status);
      },
      
      infoCompanyCallback : function (status, link){
        (!!status.type) ? 
          link.coll.collections = status.message :
          link.info = this.__getStandartMsgErr(status);
      },
      
      crudCompanyCallback : function (status, collection, link){
        (!!status.type) ? 
          $window.location.href= "#/" : 
          link.info = this.__getStandartMsgErr(status);
      },
      
    };
       
    function PrivProtMeth (status){
      
        var self = this;
        
        this.__getStandartMsgErr = function(status){
          
          return c.MSG_CLIENT_CODE + 
                 status.code+
                 c.MSG_CLIENT_MSG+
                 status.message+
                 c.MSG_CLIENT_STACK_ERROR+
                 status.obj.join();
        }
        
    }
    
    PrivProtMeth.prototype = Message;
    
    return new PrivProtMeth();
    
  }]);
    
})();