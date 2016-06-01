(function(){
  
  'use strict';
  
  angular
      .module('structureMng', [
           'ngRoute',
           //'structureMng.services.Tree',
           'structureMng.services.mongolab_CRUD',
           'structureMng.services.dataService',
           'structureMng.services.RecursionHelper',
           'structureMng.controllers.ListCtrl',
           'structureMng.controllers.CreateCtrl',
           'structureMng.controllers.EditCtrl',
           //'structureMng.controllers.TreeCtrl'
      ])
      .config(config);

  function config($routeProvider, $locationProvider) {
    
    $routeProvider
        .when('/', {
            templateUrl: 'views/list.html'
        })
        .when('/new', {
            templateUrl: 'views/create.html'
        })
        .when('/edit', {
            templateUrl: 'views/edit.html'

        })
        .when('/remove', {
            templateUrl: 'views/remove.html'
        })
        .when('/unlink', {
            templateUrl: 'views/unlink.html'
        })
        .when('/tree', {
            templateUrl: 'views/tree.html'
        })
        .otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(false);
        
  }
  
})();
