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
    ERR_ID_ISSUE:"Company indentification issue \n plese show this message to your administrator",
    ERR_SHOW_TREE : "Cannot create tree for structure, please show this message to youre administrator : ERROR",
     
    });
   
})();