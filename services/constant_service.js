(function () {
  
  "use strict";
  
  angular
      .module('structureMng')
      .constant('constant', {
    
    DB_API_URL : "https://api.mongolab.com/api/1/databases/grbdb/collections/",
    DB_API_KEY : "umQLTHlfoM-UB68t6YdiiCzRDByzOUQg",
    DB_COLLECTION_NAME : "organizations",
    DB_ID_Q: "/:id",
    DB_ID_PARAM :"@id",
    
    H_CREATE : "New company",
    H_EDIT   : "Edit company",
    H_REMOVE : "Remove company",
    H_UNLINK : "Unlink company",
    H_LIST   : "All companies",
    
    MSG_CLIENT_CODE : "\n status code : ",
    MSG_CLIENT_MSG  : "\n message : ",
    MSG_CLIENT_STACK_ERROR: "\n error : ",
    MSG_STATUS_DB_GET_SUCCESS    : 200,
    MSG_STATUS_DB_GET_ERROR      : 500,
    MSG_STATUS_DB_CREATE_SUCCESS : 201,
    MSG_STATUS_DB_CREATE_ERROR   : 501,
    MSG_STATUS_DB_UPDATE_SUCCESS : 202,
    MSG_STATUS_DB_UPDATE_ERROR   : 502,
    MSG_STATUS_DB_DELETE_SUCCESS : 203,
    MSG_STATUS_DB_DELETE_ERROR   : 503,
    MSG_TEXT_DB_GET_SUCCESS      : "collection recived \n",
    MSG_TEXT_DB_GET_ERROR        : "collection don't recived \n",
    MSG_TEXT_DB_CREATE_SUCCESS   : "collection created \n",
    MSG_TEXT_DB_CREATE_ERROR     : "collection don't created \n",
    MSG_TEXT_DB_UPDATE_SUCCESS   : "collection updated \n",
    MSG_TEXT_DB_UPDATE_ERROR     : "collection don't updated \n",
    MSG_TEXT_DB_DELETE_SUCCESS   : "collection deleted \n",
    MSG_TEXT_DB_DELETE_ERROR     : "collection don't deleted \n",
    MSG_ERR_USER                 : "unfortunately error has happened, \n please show this message to your administrator \n",
    
    MSG_ERR_TMP_GENERATE    : "problem with generate temporary collection",
    ERR_ID_ISSUE            : "problem with receive collection ID",
    ERR_ID_COLL_ISSUE       : "problem with receive self collection from ID",
    
    ERR_FIND_DESCENDANT     : "problem with find target descendants",
    ERR_PFIND_PARENT        : "problem with find target parent",
    
    ERR_SHOW_TREE           : "Cannot create tree for structure, please show this message to youre administrator : ERROR",
     
    });
   
})();