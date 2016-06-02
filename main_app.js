(function(){
  
  'use strict';
    
  angular
      .module('structureMng', ['ngRoute', 'ngResource'])
      .config(
  
  function($routeProvider) {
    
    $routeProvider
        .when('/', {
            templateUrl: 'views/list.html',
            controlleAs: 'listVm'
        })
        .when('/new', {
            templateUrl: 'views/create.html',
            controlleAs : 'CreateVm'
        })
        .when('/edit', {
            templateUrl: 'views/edit.html',
            controlleAs : 'EditVm'
        })
        .when('/remove', {
            templateUrl: 'views/remove.html',
            controlleAs : 'EditVm'
        })
        .when('/unlink', {
            templateUrl: 'views/unlink.html',
            controlleAs : 'EditVm'
        })
        .when('/tree', {
            templateUrl: 'views/tree.html',
            controlleAs : 'treeVm'
        })
        .otherwise({
            redirectTo: '/'
        });
        
        
  });
  
})();
