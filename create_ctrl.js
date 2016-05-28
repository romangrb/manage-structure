(function(){
  
  'use strict';
  
  angular
      .module('structureMng.controllers', [])
      .controller('CreateCtrl', CreateCtrl);
      
  function CreateCtrl() {
    
    this.tittle = 'All companies';
    
    this.save = function () {
      //CompaniesFactory.create(collection);
        //$location.path('/user-list');
    };
    
    /*function ($scope, UsersFactory, $location) {

        // callback for ng-click 'createNewUser':
        $scope.createNewUser = function () {
            UsersFactory.create($scope.user);
            $location.path('/user-list');
        }*/
    
    
  }
    
})();