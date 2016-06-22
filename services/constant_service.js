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
    
    MSG_USER_TEXT_DB_DELETE_SUCCESS : "company deleted successfully",
    MSG_USER_TEXT_DB_UNLINK_SUCCESS : "company unlinked successfully",
    MSG_USER_TEXT_DB_DELETE_ERROR : "company unlinked unsuccessfully",
    MSG_USER_TEXT_DB_UNLINK_ERROR : "company unlinked unsuccessfully",
    
    MSG_ERR_TMP_GENERATE    : "problem with generate temporary collection",
    ERR_ID_ISSUE            : "problem with receive collection ID",
    ERR_ID_COLL_ISSUE       : "problem with receive self collection from ID",
    
    ERR_FIND_DESCENDANT     : "problem with find target descendants",
    ERR_PFIND_PARENT        : "problem with find target parent",
    MSG_CHANGE_PARENT_SUCCESS : "target parents changed",
    MSG_CHANGE_PARENT_ERROR : "target parents don't changed",
    ERR_SHOW_TREE           : "Cannot create tree for structure, please show this message to youre administrator : ERROR",
    MSG_CHANGE_PARENT_EQUAL : "newParentId is equal oldParentId",
    
    MSG_TEXT_DB_DELETE_TARG_SUCCESS   : "collection target deleted \n",
    MSG_TEXT_DB_DELETE_TARG_ERROR     : "collection target don't deleted \n",
    
    MSG_TEXT_DB_REM_FATH_FROM_CHILDREN_SUCCESS   : "father from target children removed \n",
    MSG_TEXT_DB_REM_FATH_FROM_CHILDREN_ERROR     : "father from target children don't removed \n",
    MSG_TEXT_DB_REM_CHILDREN_FROM_FATH_SUCCESS   : "children from target parent removed \n",
    MSG_TEXT_DB_REM_CHILDREN_FROM_FATH_ERROR     : "children from target parent don't removed \n",
    });
   
})();