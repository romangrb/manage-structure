(function(){
  
  'use strict';
  
  angular
      .module('structureMng', [
           'ngRoute', 
           'structureMng.services.mongolab_CRUD',
           'structureMng.services.dataService',
           'structureMng.controllers.ListCtrl',
           'structureMng.controllers.CreateCtrl',
           'structureMng.controllers.EditCtrl'
      ])
      .config(config);

  function config($routeProvider) {
    
    $routeProvider
        .when('/', {
            templateUrl: 'list.html',
            controller: 'ListCtrl',
            controllerAs: 'listVm'
        })
        .when('/new', {
            templateUrl: 'create.html',
            controller: 'CreateCtrl',
            controllerAs: 'createVm'
        })
        .when('/edit', {
            templateUrl: 'edit.html',
            controller: 'EditCtrl',
            controllerAs: 'editVm'
        })
        .when('/remove', {
            templateUrl: 'remove.html',
            controller: 'EditCtrl',
            controllerAs: 'editVm'
        })
        .when('/unlink', {
            templateUrl: 'unlink.html',
            controller: 'EditCtrl',
            controllerAs: 'editVm'
        })
        .otherwise({
            redirectTo: '/'
        });
          
  }
  
})();
