(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .directive('tree', ['RecursionHelper',
            
  function (RecursionHelper){

   return {
        restrict: "E",
        scope: {family: '='},
        template: 
        '<p>{{ family.name }}{{test }}</p>'+
            '<ul>' + 
                '<li ng-repeat="child in family.children">' + 
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

/*(function(){

  'use strict';

  angular
    .module('structureMng')
      .directive('rotateDirct', function() { 
        
        return {
            restrict: 'AE',
            link: function (scope, element, attrs) {
              	console.log(scope, element, attrs);
            	var thisElemId = element[0].attributes.tmpid;
              
                scope.$watch(attrs.degrees, function (rotateDegrees) {
                 
                 	if (!thisElemId) return;
                    	
                    var r = 'rotate(' + rotateDegrees + 'deg)';
                    
                      if (scope.tmpid == thisElemId.value){
                        element.css({
                          '-moz-transform': r,
                          '-webkit-transform': r,
                          '-o-transform': r,
                          '-ms-transform': r
                        });
                      }
                });
            }
        };
    });
      
})(); */
