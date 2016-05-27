(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .service('crudService', crudService);
      
      
  function crudService(Read) {

  var service = {
      createRec: createRecord,
      readRec: getRecords,
      updateRec: updateRecord,
      deleteRec: deleteRecord
  };

  return service;

  function createRecord() {
      // implementation details go here
  }

  function getRecords() {
      // implementation details go here
  }

  function updateRecord() {
      // implementation details go here
  }

  function deleteRecord() {
      // implementation details go here
  }

  
  
}

    
})();