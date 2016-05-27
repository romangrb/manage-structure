(function(){
  
  'use strict';
  
  angular
      .module('structureMng', [
           'ngRoute', 
           'structureMng.services', 
           'structureMng.controllers'
      ])
      .config(config);
      
  function config($routeProvider) {
    
    $routeProvider
        .when('/', {
            templateUrl: 'list.html',
            controller: 'ListCtrl',
            controllerAs: 'listVm'
        })
        /*.when('/edit/:projectId', {
            templateUrl: 'list.html',
            controller: 'EditCtrl',
            controllerAs: 'editVm'
        })
        .when('/new', {
            templateUrl: 'create.html',
            controller: 'CreateCtrl',
            controllerAs: 'createVm'
        })
        .otherwise({
            redirectTo: '/'
        });*/
          
  }
  
})();


// var exObj = {
  
//   "id":"someId",
//   "cost":"someVal",
//   "parent_id":"some_id",
//   "child_ids":["id1","id2..."]
  
// };
 
 
// function ListCtrl($scope, Project) {
  
//   $scope.companies = Project.query();
  
// }

// function CreateCtrl($scope, $location, Project) {

//   $scope.companies = Project.query();
  
//   $scope.save = function() {
    
//     Project.save($scope.company, function(data) {
 
//       if (data.parent_id!=null){
//         var parent = data.parent_id,
//         child_id = data._id.$oid;
          
//         Project.get({id:parent}, function(parent_company) {
          
//           var childs = (parent_company.child_ids)?parent_company.child_ids:[];
          
//           childs.push(child_id);
          
//           parent_company.child_ids = childs;
          
//             parent_company.update(function(cb) {
              
//               console.log(70, cb);
//             });
        
//         });
      
//       }
      
      
//     });
    
    
//   };
  
  
// }
// //http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
 
// function EditCtrl($scope, $location, $routeParams, Project) {
//   // self has link to the object in update or delete fn
//   var self = this;
 
//   Project.get({id: $routeParams.projectId}, function(company) {
       
//     self.original = company;
    
//     var entries = Project.query(function() {
      
//       var potentialPar = [],
//         companies = [];  
      
//       angular.forEach(entries, function(v, k){
//         if(v._id.$oid !== self.original._id.$oid) {
//           companies.push(v);
//         }else{
          
          
          
//         }
//       });
      
//       $scope.companies = companies;
      
//     });
     
//     $scope.company = new Project(self.original);
     
//     //query() returns all the entries
     
      
//   });

//   $scope.isClean = function() {
//     return angular.equals(self.original, $scope.company);
//   };
  
//   $scope.save = function() {
    
//     console.log(self.original);
    
//     if (self.original.parent_id !=null ){
      
//       $scope.company.parent_id;
      
//       Project.get({id:self.original.parent_id}, function(parent_company) {
        
//         /*console.log(112, 'p', parent_company, '\n', 
//         'this', self.original, '\n',
//         'new Parent', $scope.company.parent_id);*/
//         if (parent_company.child_ids!=null&&parent_company.child_ids.length>0){ 
          
          
//         console.log(112, parent_company, self.original);
        
//           angular.forEach(parent_company.child_ids, function(v, k){
//           //arr.splice(index[, deleteCount, elem1, ..., elemN])
//             if (v===self.original._id.$oid) {
//             parent_company.child_ids.splice(k, 1);
//             }
//           });
//           parent_company.update(function(cb) {
//           console.log(122, cb );
//           });        

        
 
//         }
      
//       Project.get({id:$scope.company.parent_id}, function(new_parent_company) {
        
//         var childs = (new_parent_company.child_ids)? new_parent_company.child_ids:[];
          
//           childs.push(self.original._id.$oid);
          
//           new_parent_company.child_ids = childs;
          
//           new_parent_company.update(function(cb) {
            
//             console.log('newPar', cb);
//           });
        
//       });
      
//       self.original.parent_id = $scope.company.parent_id;
//       self.original.update(function(cb) {
//         console.log('current par', cb);
//       //$location.path('/');
      
//       });
      
      
      
//     });
    
    
      
     
//     }else{
     
//     Project.get({id:$scope.company.parent_id}, function(new_parent_company) {
        
//         var childs = (new_parent_company.child_ids)? new_parent_company.child_ids:[];
          
//           childs.push(self.original._id.$oid);
          
//           new_parent_company.child_ids = childs;
          
//           new_parent_company.update(function(cb) {
            
//             console.log('newPar', cb);
//           });
        
//     });
    
//     self.original.parent_id = $scope.company.parent_id;
//       self.original.update(function(cb) {
//         console.log('current par', cb);
//       //$location.path('/');
      
//       });

//     }
    
    
//   };
 
//   $scope.destroy = function() {
//     console.log(self.original);
//     //null || undefided  !=
//     if (self.original.child_ids!=null&&self.original.child_ids.length>0) {
     
//       angular.forEach(self.original.child_ids, function(v, k){
        
//         Project.get({id:v}, function(child_company) {
          
//           child_company.parent_id = null;
          
//           child_company.update(function(cb) {
            
//             console.log(114, cb);
//           });
        
//         });
        
//       });
      
//       self.original.destroy(function(cd) {
//         console.log(cd, 122);
//         //$location.path('/list');      
//       });
    
//     }else{
      
//       self.original.destroy(function(cd) {
//         console.log(cd, 129);
//         //$location.path('/list');      
//       });
      
//     }
    
//   };
 
  
// }













