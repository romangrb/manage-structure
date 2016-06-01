(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .directive('Tree', ['RecursionHelper',
            
  function (RecursionHelper){
  console.log('dir');
    return {
        restrict: "EA",
        scope: {family: '='},
        template: 
        '<p>{{ family.name }}|{{ family.earn }}</p>'+
            '<ul>' + 
                '<li ng-repeat="child in family.children_ids">' + 
                    '<tree family="child"></tree>' +
                '</li>' +
            '</ul>',
        compile: function(element) {
            return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn){
                // Define your normal link function here.
                // Alternative: instead of passing a function,
                // you can also pass an object with 
                // a 'pre'- and 'post'-link function.
            });
        }
    };
    
  }]);
  
})();
