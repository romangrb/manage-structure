(function(){
  
  'use strict';
  
  angular
      .module('structureMng')
      .directive('tree', function (){
    
   return {
        restrict: "E",
        scope: {family: '='},
        template: [
         "<table class='text-center table-responsive tree-tabl'>",
           "<thead>",
             "<tr>",
               "<th class='text-center'><small>name<small></th>",
               "<th class='text-center'><small>estimated earning (K)<small></th>",
               "<th class='text-center'><small>total estimated earning (K)<small></th>",
             "</tr>",
           "</thead>",
            "<tbody>",
              "<tr>",
                "<td class='text-center'>{{family.name}}</td>",
                "<td class='text-center'>{{family.income}}</td>",
                "<td class='text-center'>{{family.total}}</td>",
              "</tr>",
            "</tbody>",
          "</table>",
            '<ul>',
                '<li ng-repeat="child in family.children">',
                    '<tree family="child"></tree>',
                '</li>',
            '</ul>'].join('')
    };
    
  });
  
})();
