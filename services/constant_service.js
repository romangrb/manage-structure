(function () {
  
  "use strict";
  
  angular
      .module('structureMng')
      .constant('constant', {
     
    H_CREATE : 'New company',
    H_EDIT   : 'Edit company',
    H_REMOVE : 'Remove company',
    H_UNLINK : 'Unlink company',
    H_LIST : 'All companies',
    MSG_STATUS_DB_GET_SUCCESS    : 200,
    MSG_STATUS_DB_GET_ERROR      : 500,
    MSG_STATUS_DB_CREATE_SUCCESS : 201,
    MSG_STATUS_DB_CREATE_ERROR   : 501,
    MSG_STATUS_DB_UPDATE_SUCCESS : 202,
    MSG_STATUS_DB_UPDATE_ERROR   : 502,
    MSG_STATUS_DB_DELETE_SUCCESS : 203,
    MSG_STATUS_DB_DELETE_ERROR   : 503,
    MSG_TEXT_DB_GET_SUCCESS    : "collection recived",
    MSG_TEXT_DB_GET_ERROR      : "collection don't recived",
    MSG_TEXT_DB_CREATE_SUCCESS : "collection created",
    MSG_TEXT_DB_CREATE_ERROR   : "collection don't created",
    MSG_TEXT_DB_UPDATE_SUCCESS : "collection updated",
    MSG_TEXT_DB_UPDATE_ERROR   : "collection don't  updated",
    MSG_TEXT_DB_DELETE_SUCCESS : "collection deleted",
    MSG_TEXT_DB_DELETE_ERROR   : "collection don't deleted",
    MSG_ERR_USER               : "please show this message to your administrator",
    
    ERR_ID_ISSUE:"Company indentification issue \n plese show this message to your administrator",
    ERR_SHOW_TREE : "Cannot create tree for structure, please show this message to youre administrator : ERROR",
     
    });
   
})();